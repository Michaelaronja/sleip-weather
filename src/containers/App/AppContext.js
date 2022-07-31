import * as React from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";
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

  const [weatherData, setWeatherData] = React.useState({});
  const [locationName, setLocationName] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [locationsList, setLocationsList] = React.useState([]);

  const hasGeolocation = React.useRef(false);

  const onGetLocation = React.useCallback(async (coordinates) => {
    await getLocation(coordinates).then((res) =>
      res
        .json()
        .then(async (data) => {
          const name = data?.[0]?.state
            ? `${data?.[0]?.name}, ${data?.[0]?.state}`
            : `${data?.[0]?.name}`;
          setLocationName(name);
        })
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

  const onLocationSearchSubmit = React.useCallback(
    async (e, props) => {
      e.preventDefault();

      const { lat, lon } = props;

      fetchWeatherData({ lat, lon });
      setLocationsList([]);
    },
    [fetchWeatherData]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autocompleteLocations = React.useCallback(
    throttle(
      async (e) => {
        const locationOptions = await getCoordinates(e.target.value).then(
          (res) => res.json().then((data) => data)
        );

        setLocationsList(locationOptions);
      },
      600,
      {
        leading: false,
      }
    ),
    []
  );

  const onLocationSearchChange = React.useCallback(
    (e) => {
      autocompleteLocations(e);
    },
    [autocompleteLocations]
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
    locationsList,
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
