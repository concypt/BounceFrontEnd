import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imagePath, setimagePath] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          "https://bounce.extrasol.co.uk/api/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setUserName(responseData.data.name);
        setFirstName(responseData.data.first_name);
        setLastName(responseData.data.last_name);
        setimagePath(responseData.data.imagePath);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUserInfo();
  }, [token]);

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
        <h3>{userName ? userName : firstName + " " + lastName}</h3>{" "}
        <span className={styles.caret}></span>
        <img src={imagePath ? imagePath : "images/base.svg"} alt="" />
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
