import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sidebar.module.css"; // Assuming you have a CSS module for styling

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
      <h1>Header</h1>
      <button onClick={handleLogout} className={styles.logoutBtn}>
        Logout
      </button>
    </header>
  );
};

export default Header;
