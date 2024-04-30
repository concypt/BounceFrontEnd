import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    // Check user's login status when component mounts
    const userToken = localStorage.getItem("token"); // Assuming you store the token in localStorage
    if (userToken) {
      setLoggedIn(true);
    }
  }, []);

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
              <button
                className={`${styles.global_button_one} ${styles.nav_btn}`}
              >
                Host an event
              </button>
            </div>
          </ul>
          <div className={styles.host_and_signin}>
            <button className={styles.global_button_one}>Host an event</button>
            {loggedIn ? (
              <a href="/dashboard" className={styles.loginBtn}>
                Dashboard
              </a>
            ) : (
              <a href="/login" className={styles.loginBtn}>
                Sign In
              </a>
            )}
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
