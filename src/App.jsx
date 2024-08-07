import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import NewsDetail from "./pages/NewsDetail.jsx";
import Checkout from "./pages/Checkout.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Register from "./components/Auth/Register";
import Verification from "./components/Auth/Verification";
import Login from "./components/Auth/Login";
import ForgotPasswordRequest from "./components/Auth/ForgotPasswordRequest";
import HostProfile from "./components/HostProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApplyHost from "./pages/Dashboard/ApplyForHost";
import Event from "./pages/Dashboard/Event";
import LoadingBar from "react-top-loading-bar";
import Tickets from "./pages/Dashboard/Tickets.jsx";
import SubscribeList from "./pages/Dashboard/SubscribeList.jsx";
import EventSingle from "./pages/Dashboard/EventSingle.jsx";
import Marketing from "./pages/Dashboard/Marketing.jsx";
import HostEvent from "./pages/Dashboard/HostEvent.jsx";
import HostCampaigns from "./pages/Dashboard/HostCampaigns.jsx";
import HostEventTicket from "./pages/Dashboard/HostTicket.jsx";
import Attend from "./pages/Dashboard/Attend.jsx";
import PrivacyPolicy from "./pages/static/PrivacyPolicy.jsx";
import About from "./pages/static/About.jsx";
import News from "./pages/static/News.jsx";
import Contact from "./pages/static/Contact.jsx";
import TermsConditions from "./pages/static/TermsConditions.jsx";
import CookiePolicy from "./pages/static/CookiePolicy.jsx";
import ScrollToTop from "./components/utils/scrollToTop.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ScrollToTop />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route
            path="/host-profile/:organisationId"
            element={<HostProfile />}
          />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/About" element={<About />} />
          <Route path="/News" element={<News />} />
          <Route path="/news/:newsId" element={<NewsDetail />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/TermsConditions" element={<TermsConditions />} />
          <Route path="/CookiePolicy" element={<CookiePolicy />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
      {/* Should be in dashboard layout  */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/dashboard-host" element={<ApplyHost />} />
        <Route path="/dashboard-event" element={<Event />} />
        <Route
          path="/dashboard-single-event/:eventId"
          element={<EventSingle />}
        />
        <Route path="/dashboard-event-tickets/:eventId" element={<Tickets />} />
        <Route
          path="/host-subscribe-list/:subscribelist_Id"
          element={<SubscribeList />}
        />
        <Route path="/dashboard-marketing" element={<Marketing />} />
        <Route path="/host-event/new" element={<HostEvent />} />
        <Route path="/host-campaigns/new" element={<HostCampaigns />} />
        <Route path="/host-campaigns-edit/:id" element={<HostCampaigns />} />
        <Route path="/host-event/edit/:id" element={<HostEvent />} />
        <Route path="/host-event/:id/tickets" element={<HostEventTicket />} />
        <Route path="/attend" element={<Attend />} />
      </Route>
      {/* without layout pages */}
      <Route path="/register" element={<Register />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/forgot-password-request"
        element={<ForgotPasswordRequest />}
      />
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
