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
        <img src="/images/dashboard/logo.svg" alt="Logo" />
      </div>
      <ul className={styles.links}>
        <li>
          <a href="#">Link 1</a>
        </li>
        <li>
          <a href="#">Link 2</a>
        </li>
        <li>
          <a href="#" onClick={toggleSublinks}>
            Link 3
          </a>
          <ul
            className={`${styles.sublinks} ${
              showSublinks ? styles.showSublinks : ""
            }`}
          >
            <li>
              <a href="#">Sublink 1</a>
            </li>
            <li>
              <a href="#">Sublink 2</a>
            </li>
            <li>
              <a href="#">Sublink 3</a>
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
