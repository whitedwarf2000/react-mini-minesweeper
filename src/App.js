import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { routes } from "./routes";
import history from "./utils/history";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Router history={history}>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route key={index} path={route.path} component={route.component}/>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
