import * as React from "react";
import { format } from "date-fns";
import { useApp } from "containers/App/AppContext";
import Search from "components/Search";
import WeatherIcon from "components/WeatherIcon";
import SleipIcon from "components/icons/Sleip";
import ForecastList from "components/ForecastList";
import classes from "./App.module.scss";

const App = () => {
  const {
    isLoading,
    locationName,
    weatherData: { current, daily },
  } = useApp();

  const icon = current?.weather[0]?.icon;
  const currentDate = Date.now(current?.dt);
  const date = format(new Date(currentDate), "MMMM d, EEEE");
  const temp = String(Math.ceil(current?.temp));
  const forecastList = daily?.slice(1);

  return (
    <div className={classes.root}>
      {isLoading && (
        <div className={classes.loader}>
          <p className={classes.loaderText}>Fetching weather data...</p>
          <SleipIcon className={classes.loaderIcon} />
        </div>
      )}

      {!isLoading && (
        <>
          <div className={classes.firstCol}>
            <Search />

            <div className={classes.firstColContent}>
              {temp && <h1 className={classes.temp}>{temp}</h1>}

              {locationName && date && (
                <div className={classes.locationData}>
                  <p className={classes.location}>{locationName}</p>
                  <p className={classes.date}>{date}</p>
                </div>
              )}
            </div>
          </div>

          <div className={classes.container}>
            <Search className={classes.searchField} />

            <div className={classes.weatherData}>
              {date && locationName && (
                <div className={classes.weatherDataDate}>
                  <p>{date}</p>
                  <p>{locationName}</p>
                </div>
              )}

              {temp && <p className={classes.weatherDataTemp}>{temp}</p>}
            </div>

            {icon && <WeatherIcon icon={icon} />}

            <div className={classes.weatherDataFooter}>
              <div>
                <p className={classes.weatherDataMain}>
                  {current?.weather[0]?.main}
                </p>

                <p className={classes.weatherDataDescription}>
                  {current?.weather[0]?.description}
                </p>
              </div>

              <div className={classes.weatherDataParams}>
                <p>
                  wind m/s
                  <span>{String(Math.ceil(current?.wind_speed))}</span>
                </p>

                <p>
                  feels like ºC
                  <span>{String(Math.ceil(current?.feels_like))}</span>
                </p>

                <p>
                  clouds %<span>{String(current?.clouds)}</span>
                </p>
              </div>
            </div>

            {forecastList && <ForecastList list={forecastList} />}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
