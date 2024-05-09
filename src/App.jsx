import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import PageNotFound from "./pages/PageNotFound.jsx";
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
import EventSingle from "./pages/Dashboard/ViewSingleEvent.jsx";
import Marketing from "./pages/Dashboard/Marketing.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/host-profile/:organisationId" element={<HostProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      {/* Should be in dashboard layout  */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard-host" element={<Host />} />
      <Route path="/dashboard-event" element={<Event />} />
      <Route path="/dashboard-single-event" element={<EventSingle />} />
      <Route path="/dashboard-marketing" element={<Marketing />} />
      {/* without layout pages */}
      <Route path="/register" element={<Register />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/forgot-password-request"
        element={<ForgotPasswordRequest />}
      />
      <Route path="/forgot-password-reset" element={<ForgotPasswordReset />} />
    </>
  )
);
function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Set loading complete to true when the page has finished loading
  window.onload = () => {
    setLoadingComplete(true);
  };

  return (
    <>
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 100 : 0}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
