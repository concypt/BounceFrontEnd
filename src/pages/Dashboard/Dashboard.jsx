import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import Footer from "../components/Footer";
import styles from "../..Dashboard/dasboard.module.css";

function Dashboard() {
  return (
    <div>
      {/* Render Navbar */}
      <Header />

      {/* Render EventList component with the events data */}

      {/* Render Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
