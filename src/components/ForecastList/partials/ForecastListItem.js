import * as React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import classnames from "clsx";
import WeatherIcon from "components/WeatherIcon";
import classes from "./ForecastListItem.module.scss";

const ForecastListItem = ({ expanded: expandedProp, item }) => {
  const [expanded, setExpanded] = React.useState(expandedProp || false);

  const date = new Date(item.dt * 1000);
  const formatDate = format(date, "MMMM d, EEEE");

  const handleClick = () => setExpanded((prev) => !prev);

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
        <p>Feels like ºC</p>
        <p className={classes.expansionDetailValue}>
          {Math.ceil(item?.feels_like.day)}
        </p>

        <p>Wind m/s</p>
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
  expanded: PropTypes.bool,
  item: PropTypes.object.isRequired,
};

export default ForecastListItem;
