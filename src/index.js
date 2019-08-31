import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import CardContainer from "./components/flashCard";
import { Grid } from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { theme } from "./theme";

function App() {
  return React.createElement(
    MuiThemeProvider,
    { theme },
    React.createElement(
      Grid,
      {
        alignItems: "center",
        alignContent: "center",
        container: true,
        justify: "center",
        direction: "column",
        spacing: 0
      },
      React.createElement(
        Grid,
        { item: true },
        React.createElement(CardContainer, {})
      )
    )
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
