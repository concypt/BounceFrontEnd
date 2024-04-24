import React, { useState } from "react";
import styles from "./navbar.module.css";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="App">
      <header className={styles.App_header}>
        <nav className={styles.navbar}>
          <a href="/" className={styles.logo}>
            <img src="../images/logo.svg" alt="" />
          </a>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
            <li onClick={() => setIsActive(false)}>
              <a href="#" className={styles.navLink}>
                About
              </a>
            </li>
            <li onClick={() => setIsActive(false)}>
              <a href="/events" className={styles.navLink}>
                Browse
              </a>
            </li>
            <li onClick={() => setIsActive(false)}>
              <a href="#" className={styles.navLink}>
                News
              </a>
            </li>
            <li onClick={() => setIsActive(false)}>
              <a href="#" className={styles.navLink}>
                Contact
              </a>
            </li>
            <div className="navbtn_div">
              <a
                href=""
                className={`${styles.global_button_one} ${styles.nav_btn}`}
              >
                Host an event
              </a>
            </div>
          </ul>
          <div className={styles.host_and_signin}>
            <button className={styles.global_button_one}>Host an event</button>
            <a href="/login" className="global-link-arrow">
              <u>Sign In</u>
            </a>
          </div>
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
