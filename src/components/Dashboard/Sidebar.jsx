import React, { useState } from "react";
import styles from "./sidebar.module.css"; // Import module CSS

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSublinks, setShowSublinks] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSublinks = () => {
    setShowSublinks(!showSublinks);
  };

  return (
    <div className={`${styles.sidebar} ${showMenu ? styles.showMenu : ""}`}>
      <div className={styles.logo}>
        <img src="/images/dashboard/dash-logo.svg" alt="Logo" />
      </div>
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
      <div className={`${styles.hamburger}`} onClick={toggleMenu}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default Sidebar;
