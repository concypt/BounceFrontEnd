import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "./js/main.js";
import "./js/custom.js";
//import $ from "jquery";
//import LoadingBar from "react-top-loading-bar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
