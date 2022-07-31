import * as React from "react";
import PropTypes from "prop-types";
import classnames from "clsx";
import { useAppHandlers, useApp } from "containers/App/AppContext";
import SearchIcon from "components/icons/Search";
import classes from "./Search.module.scss";

const Search = ({ className }) => {
  const { onLocationSearchSubmit, onLocationSearchChange } = useAppHandlers();
  const { locationsList } = useApp();

  const formRef = React.useRef();

  const handleSubmit = (e, { lat, lon }) => {
    const coordinates = { lat, lon };
    onLocationSearchSubmit(e, coordinates);
    formRef.current.reset();
  };

  return (
    <div className={classnames(className, classes.root)}>
      <form className={classes.form} ref={formRef}>
        <div className={classes.customField}>
          <input
            id="location"
            type="search"
            placeholder="Search location"
            onChange={onLocationSearchChange}
          />

          <SearchIcon className={classes.submitIcon} />
        </div>

        {locationsList && locationsList.length > 0 && (
          <div component="select" className={classes.options}>
            {locationsList.map((opt, idx) => (
              <button
                className={classes.option}
                value={`${opt.name}, ${opt.state}`}
                key={idx}
                onClick={(e) => handleSubmit(e, { lat: opt.lat, lon: opt.lon })}
              >
                {opt.state ? `${opt.name}, ${opt.state}` : opt.name}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
