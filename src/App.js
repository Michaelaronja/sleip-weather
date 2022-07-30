import * as React from "react";
import App from "containers/App";

import { AppProvider } from "containers/App/AppContext";
import classes from "./AppRoot.module.scss";

function AppRoot() {
  return (
    <div className={classes.root}>
      <AppProvider>
        <App />
      </AppProvider>
    </div>
  );
}

export default AppRoot;
