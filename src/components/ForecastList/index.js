import * as React from "react";
import PropTypes from "prop-types";
import ForecastListItem from "./partials/ForecastListItem";
import classes from "./ForecastList.module.scss";

const ForecastList = ({ list = [] }) => {
  return (
    <div className={classes.root}>
      {list.map((item, idx) => (
        <ForecastListItem item={item} key={idx} expanded={idx === 0} />
      ))}
    </div>
  );
};

ForecastList.propTypes = {
  list: PropTypes.array,
};

export default ForecastList;
