import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css"; // Assuming you have a CSS module for styling

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <a
        href="#"
        className={`dropdown-toggle ${styles.headerProfile} ${styles.dropdown}`}
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <h3>Tristan Nothling</h3> <span className={styles.caret}></span>
        <img src="images/base.svg" alt="" />
        <ul className={`${styles.dropdownMenu} ${styles.dropdownMenu1}`}>
          <li>
            <img src="images/dashboard/dashboardProfile.svg" alt="" />
            <a href="#">Profile</a>
          </li>
          <li>
            <img src="images/dashboard/dashboardSetting.svg" alt="" />
            <a href="#">Help</a>
          </li>
          <li onClick={handleLogout} className={styles.lastLi}>
            <img src="images/dashboard/dashboardLogout.svg" alt="" />
            <a className={styles.logoutLink} onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </a>
      {/* <button onClick={handleLogout} className={styles.logoutBtn}>
        Logout
      </button> */}
    </header>
  );
};

export default Header;
