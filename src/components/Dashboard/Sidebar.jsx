import React, { useState } from "react";
import styles from "./sidebar.module.css"; // Import module CSS

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSublinks, setShowSublinks] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleSublinks = () => {
    setShowSublinks(!showSublinks);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      <div className={`${styles.sidebar} ${showSidebar ? styles.active : ""}`}>
        <div className={styles.logo}>
          <img src="/images/dashboard/dash-logo.svg" alt="Logo" />
        </div>
        <button className={styles.closeBtn} onClick={closeSidebar}>
          &times; {/* Display a cross character */}
        </button>
        <ul className={styles.links}>
          <li>
            <a href="#">Attend</a>
          </li>
          <li>
            <a href="#">Promote</a>
          </li>
          <li>
            <a href="#" onClick={toggleSublinks}>
              Host
            </a>
            <ul
              className={`${styles.sublinks} ${
                showSublinks ? styles.showSublinks : ""
              }`}
            >
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Marketing</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
