import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function EventDashboard() {
  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
    </div>
  );
}
export default EventDashboard;
