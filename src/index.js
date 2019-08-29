import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import FlashCard from "./components/flashCard";

function App() {
  return (
    <div className="App">
      <FlashCard />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
