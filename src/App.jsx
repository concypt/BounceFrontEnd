import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import PageNotFound from "./PageNotFound";
import Register from "./components/Auth/Register";
import Verification from "./components/Auth/Verification";
import Login from "./components/Auth/Login";
import ForgotPasswordRequest from "./components/Auth/ForgotPasswordRequest";
import ForgotPasswordReset from "./components/Auth/ForgotPasswordReset";
import HostProfile from "./components/HostProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Host from "./pages/Dashboard/Host";
import Event from "./pages/Dashboard/Event";
import LoadingBar from "react-top-loading-bar";
import "./styles.css";
import "./global.css";
import "./js/main.js";
import "./js/custom.js";

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Set loading complete to true when the page has finished loading
  window.onload = () => {
    setLoadingComplete(true);
  };

  return (
    <div>
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 100 : 0}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/host-profile/:organisationId"
            element={<HostProfile />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/forgot-password-request"
            element={<ForgotPasswordRequest />}
          />
          <Route
            path="/forgot-password-reset"
            element={<ForgotPasswordReset />}
          />
          <Route path="/dashboard-host" element={<Host />} />
          <Route path="/dashboard-event" element={<Event />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
