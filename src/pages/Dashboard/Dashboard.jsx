import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import "./primaryStyles.css";

function Dashboard() {
  const navigate = useNavigate(); // Import useNavigate

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (!token) {
      // Token doesn't exist, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      {/* Add your components here */}
      <Header />
      <Sidebar />
      {/* Render EventList component with the events data */}
    </div>
  );
}

export default Dashboard;
