import * as React from "react";
import PropTypes from "prop-types";
import { getWeatherData, getCoordinates, getLocation } from "api";

const AppContext = React.createContext({});
const AppHandlersContext = React.createContext({});

export function useAppHandlers() {
  return React.useContext(AppHandlersContext);
}

export function useApp() {
  return React.useContext(AppContext);
}

export const AppProvider = (props) => {
  const { children } = props;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [weatherData, setWeatherData] = React.useState({});
  const [locationName, setLocationName] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const hasGeolocation = React.useRef(false);

  const onGetLocation = React.useCallback(async (coordinates) => {
    await getLocation(coordinates).then((res) =>
      res
        .json()
        .then(async (data) => setLocationName(data?.[0]?.name))
        .catch((err) => console.log({ err }))
    );
  }, []);

  const fetchWeatherData = React.useCallback(
    async (coord) => {
      onGetLocation(coord);
      await getWeatherData(coord).then((res) =>
        res
          .json()
          .then((data) => {
            setWeatherData(data);
            setIsLoading(false);
          })
          .catch((err) => console.log({ err }))
      );
    },
    [onGetLocation]
  );

  const onGeolocationSuccess = React.useCallback(
    async (pos) => {
      const { latitude, longitude } = pos.coords;

      const coordinates = {
        lat: latitude,
        lon: longitude,
      };

      fetchWeatherData(coordinates);

      // set ref to true to avoid requesting geolocation if already found
      hasGeolocation.current = true;
    },
    [fetchWeatherData]
  );

  const onLocationSearchChange = React.useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const onLocationSearchSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();

      const coordinates = await getCoordinates(searchTerm).then((res) =>
        res.json().then((data) => data?.[0])
      );

      const { lat, lon } = coordinates;

      fetchWeatherData({ lat, lon });
      e.target.reset();
    },
    [fetchWeatherData, searchTerm]
  );

  React.useEffect(() => {
    // Stockholm coordinates
    const defaultCoordinates = {
      lat: 59.3251172,
      lon: 18.0710935,
    };

    if (!hasGeolocation.current) {
      setIsLoading(true);
      navigator?.geolocation?.getCurrentPosition(
        onGeolocationSuccess,
        async (err) => {
          console.warn(err);
          fetchWeatherData(defaultCoordinates);
        }
      );

      return () => {
        hasGeolocation.current = false;
      };
    }
  }, [fetchWeatherData, onGeolocationSuccess, onGetLocation]);

  // Memoize handlers context separately so that one can subscribe
  // to them without re-rendering on state updates.
  const handlersContextValue = React.useMemo(
    () => ({
      onLocationSearchChange,
      onLocationSearchSubmit,
    }),
    [onLocationSearchChange, onLocationSearchSubmit]
  );

  const contextValue = {
    isLoading,
    locationName,
    weatherData,
  };

  return (
    <AppHandlersContext.Provider value={handlersContextValue}>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </AppHandlersContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
