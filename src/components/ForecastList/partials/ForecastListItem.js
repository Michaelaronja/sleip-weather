import * as React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import classnames from "clsx";
import WeatherIcon from "components/WeatherIcon";
import classes from "./ForecastListItem.module.scss";

const ForecastListItem = ({ item, expanded: expandedProp }) => {
  const [expanded, setExpanded] = React.useState(expandedProp);

  const date = new Date(item.dt * 1000);
  const formatDate = format(date, "MMMM d, EEEE");

  const handleClick = React.useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className={classnames(classes.root, { [classes.expanded]: expanded })}
      onClick={handleClick}
    >
      <div className={classes.primaryDetails}>
        <div className={classes.leftColumn}>
          <div>
            <p className={classes.date}>{formatDate}</p>
          </div>
          <p className={classes.weatherDetails}>
            {item.weather[0]?.main}, <span>{item.weather[0]?.description}</span>
          </p>
        </div>

        <div className={classes.rightColumn}>
          <p className={classes.temp}>{Math.ceil(item?.temp.max)}</p>

          <WeatherIcon
            className={classes.icon}
            icon={item?.weather?.[0]?.icon}
          />
        </div>
      </div>

      <div className={classes.expansionDetails}>
        <p>feels like ºC</p>
        <p className={classes.expansionDetailValue}>
          {Math.ceil(item?.feels_like.day)}
        </p>
        <p>wind m/s</p>
        <p className={classes.expansionDetailValue}>
          {Math.ceil(item?.wind_speed)}
        </p>
        <p>Clouds %</p>
        <p className={classes.expansionDetailValue}>{item.clouds}</p>
      </div>
    </div>
  );
};

ForecastListItem.propTypes = {
  item: PropTypes.object,
};

export default ForecastListItem;
