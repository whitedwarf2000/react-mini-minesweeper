import React from "react";
import WelcomeScreen from "./containers/Welcome";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <WelcomeScreen />
    </div>
  );
}

export default App;
