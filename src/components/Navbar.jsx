import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./navbar.module.css";
import logo from "../assets/images/logo.svg";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    // Check user's login status when component mounts
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setLoggedIn(true);
    }
  }, []);

  const linkClass = ({ isActive }) =>
    isActive
      ? `${styles.navLink} ${styles.navLinkActive}`
      : `${styles.navLink}`;

  return (
    <div className="App">
      <header className={styles.App_header}>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Bounce" />
          </Link>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
            <li onClick={() => setIsActive(false)}>
              <NavLink to="/About" className={linkClass}>
                About
              </NavLink>
            </li>
            <li onClick={() => setIsActive(false)}>
              <NavLink to="/events?page=1" className={linkClass}>
                Browse
              </NavLink>
            </li>
            <li onClick={() => setIsActive(false)}>
              <NavLink to="/News" className={linkClass}>
                News
              </NavLink>
            </li>
            <li onClick={() => setIsActive(false)}>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
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
            {/* <NavLink to="/login" className={styles.loginBtn}>
              Sign In
            </NavLink> */}
            {loggedIn ? (
              <NavLink to="/dashboard" className={styles.loginBtn}>
                Dashboard
              </NavLink>
            ) : (
              <NavLink to="/login" className={styles.loginBtn}>
                Sign In
              </NavLink>
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
