import * as React from "react";
import PropTypes from "prop-types";
import classnames from "clsx";
import { useAppHandlers } from "containers/App/AppContext";
import SearchIcon from "components/icons/Search";
import classes from "./Search.module.scss";

const Search = ({ className }) => {
  const { onLocationSearchSubmit, onLocationSearchChange } = useAppHandlers();

  return (
    <div className={classnames(className, classes.root)}>
      <form onSubmit={onLocationSearchSubmit}>
        <div className={classes.customField}>
          <input
            id="location"
            type="search"
            placeholder="Search location"
            onChange={onLocationSearchChange}
          />

          <button className={classes.submitBtn} type="submit">
            <SearchIcon className={classes.submitIcon} />
          </button>
        </div>
      </form>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
