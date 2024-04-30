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
      <div className="bounce_bg_circle">
        <div className={styles.filterFrame}>
          <div className={styles.filters}>
            <h1>Filter</h1>
            <form action="/action_page.php" className={styles.searchDiv}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Enter your search terms here..."
                name="search"
                required
              />
              <button type="submit">Search</button>
            </form>
            {/* <ul>
              <li>
                <label htmlFor="box1">
                  <input type="checkbox" name="" id="box1" />
                  <span>Party</span>
                </label>
              </li>
              <li>
                <input type="checkbox" name="" id="box2" />
                <label htmlFor="box2">Element 2</label>
              </li>
              <li>
                <input type="checkbox" name="" id="box3" />
                <label htmlFor="box3">Element 3</label>
              </li>
              <li>
                <input type="checkbox" name="" id="box4" />
                <label htmlFor="box4">Element 4</label>
              </li>
              <li>
                <input type="checkbox" name="" id="box5" />
                <label htmlFor="box5">Element 5</label>
              </li>
              <li>
                <input type="checkbox" name="" id="box6" />
                <label htmlFor="box6">Element 6</label>
              </li>
              <li>
                <input type="checkbox" name="" id="box7" />
                <label htmlFor="box7">Element 7</label>
              </li>
              <li>
                <input type="checkbox" name="" id="box8" />
                <label htmlFor="box8">Element 8</label>
              </li>
              <li>
                <input type="checkbox" name="" id="box9" />
                <label htmlFor="box9">Element 9</label>
              </li>
              <li>
                <input type="checkbox" name="" id="box10" />
                <label htmlFor="   ">Element 10</label>
              </li>
            </ul> */}

            <div className={styles.count}>Checked checkboxes: </div>
          </div>
        </div>

        {/* Render EventList component with the events data */}
        <div className={styles.eventList}>
          <EventList className={styles.eventsGrid} />
        </div>
      </div>
      {/* Render Footer */}
      <Footer />
    </div>
  );
}

export default Events;
