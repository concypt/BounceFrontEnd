import { useState } from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";

//images
import dashLogoImage from "../../assets/images/dashboard/dash-logo.svg";

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
          <a href="/">
            <img src={dashLogoImage} alt="Logo" />
          </a>
        </div>
        <button className={styles.closeBtn} onClick={closeSidebar}>
          &times; {/* Display a cross character */}
        </button>
        <ul className={styles.links}>
          <li>
            <Link to="">Attend</Link>
          </li>
          <li>
            <Link to="">Promote</Link>
          </li>
          <li>
            <Link to={`/dashboard-host`} onClick={toggleSublinks}>
              Host
            </Link>
            <ul
              className={`${styles.sublinks} ${
                showSublinks ? styles.showSublinks : ""
              }`}
            >
              <li>
                <Link to={`/dashboard-event`}>Events</Link>
              </li>
              <li>
                <Link to={`/dashboard-marketing`}>Marketing</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
