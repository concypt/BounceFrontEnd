import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../components/events.module.css";
import EventList from "../components/EventList";

function Events() {
  return (
    <div>
      {/* Render Navbar */}
      <Navbar />

      {/* Render EventList component with the events data */}
      <EventList />

      {/* Render Footer */}
      <Footer />
    </div>
  );
}

export default Events;
