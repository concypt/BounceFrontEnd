import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fname = localStorage.getItem("fname");
  const lname = localStorage.getItem("lname");
  const userImage = localStorage.getItem("userImage");

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div
        href="#"
        className={`dropdown-toggle ${styles.headerProfile} ${styles.dropdown}`}
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <h3>{fname + " " + lname}</h3> <span className={styles.caret}></span>
        <img src={userImage ? userImage : "images/base.svg"} alt="" />
        <ul className={`${styles.dropdownMenu} ${styles.dropdownMenu1}`}>
          <li>
            <Link to={`/dashboard`}>
              <img src="images/dashboard/dashboardProfile.svg" alt="" />
              Profile
            </Link>
          </li>
          <li>
            <img src="images/dashboard/dashboardSetting.svg" alt="" />
            <Link>Help</Link>
          </li>
          <li onClick={handleLogout} className={styles.lastLi}>
            <img src="images/dashboard/dashboardLogout.svg" alt="" />
            <a className={styles.logoutLink} onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
