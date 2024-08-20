import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Providers from "./components/Providers.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "./js/custom.js";
import { Elements } from '@stripe/react-stripe-js'; // Import Elements provider
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe function

// Load your Stripe public key
const stripePromise = loadStripe('pk_live_51OFSLnEV8KWKgxSr14DYwJxqZ1qZekKmzb2XSQoJhqHRDGRE3R4nZmOi3S4f8TJMNS5F12M7P4TR1dooL56k5c6Q00bQIpCPGY');


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
    <Elements stripe={stripePromise}>
      <App />
      </Elements>
    </Providers>
  </React.StrictMode>
);
