import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
const greeting = "Hello React";

module.hot.accept();

ReactDOM.render(<App greeting={greeting} />, document.getElementById("root"));
