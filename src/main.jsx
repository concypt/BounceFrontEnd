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
const stripePromise = loadStripe('pk_test_51IZ8jfD7gIuku9edlByPjJwtRcWSL1qCI8ehxGa5xSz8SPZl6khh3Kll9fJVzyP2a6k9nK7xLtvOtI8ujl9B5MQC00eyBZQwgu');


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
    <Elements stripe={stripePromise}>
      <App />
      </Elements>
    </Providers>
  </React.StrictMode>
);
