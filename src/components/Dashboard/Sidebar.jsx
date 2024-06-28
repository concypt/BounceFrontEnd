import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { UserContext } from "../../contexts/UserProvider";

// images
import dashLogoImage from "../../assets/images/dashboard/dash-logo.svg";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSublinks, setShowSublinks] = useState(false);

  const isHostNull = user.org_role == 0 ? true : false;
 
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
          <NavLink to="/">
            <img src={dashLogoImage} alt="Logo" />
          </NavLink>
        </div>
        <button className={styles.closeBtn} onClick={closeSidebar}>
          &times; {/* Display a cross character */}
        </button>
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/Attend"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
              onClick={closeSidebar}
            >
              Attend
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Promote"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
              onClick={closeSidebar}
            >
              Promote
            </NavLink>
          </li>
          <li>
            { isHostNull ? (
              <NavLink
                to="/dashboard-host"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
                onClick={closeSidebar}
              >
                Host
              </NavLink>
            ) : (
              <>
                <div
                  className={styles.linkWithSublinks}
                  onClick={toggleSublinks}
                >
                  <span>Host</span>
                </div>
                <ul
                  className={`${styles.sublinks} ${
                    showSublinks ? styles.showSublinks : ""
                  }`}
                >
                  <li>
                    <NavLink
                      to="/dashboard-event"
                      className={({ isActive }) =>
                        isActive ? styles.activeLink : ""
                      }
                      onClick={closeSidebar}
                    >
                      Events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard-marketing"
                      className={({ isActive }) =>
                        isActive ? styles.activeLink : ""
                      }
                      onClick={closeSidebar}
                    >
                      Marketing
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
