import * as React from "react";
import PropTypes from "prop-types";
import classnames from "clsx";
import { iconMapper } from "utils";
import classes from "./WeatherIcon.module.scss";

const WeatherIcon = ({ className, icon }) => {
  const Icon = iconMapper(icon);

  return <Icon className={classnames(className, classes.root)} />;
};

WeatherIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

export default WeatherIcon;
