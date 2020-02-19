/* 
  Setup wrapped component with Provider and Router
 */
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../configureStore";
import history from "./history";
import React from "react";

export const setUpComponent = children => {
  return (
    <Provider store={store}>
      <Router history={history}>
        {children}
      </Router>
    </Provider>
  );
};