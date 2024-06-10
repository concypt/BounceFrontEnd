import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Providers from "./components/Providers.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "./js/custom.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
