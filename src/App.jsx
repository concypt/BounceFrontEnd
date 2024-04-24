import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail.jsx";
import PageNotFound from "./PageNotFound";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ForgotPasswordRequest from "./components/Auth/ForgotPasswordRequest";
import ForgotPasswordReset from "./components/Auth/ForgotPasswordReset";
import "./styles.css";
import "./global.css";
import "./js/main.js";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/forgot-password-request"
            element={<ForgotPasswordRequest />}
          />
          <Route
            path="/forgot-password-reset"
            element={<ForgotPasswordReset />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
