import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { UserContext } from "../../contexts/UserProvider";

// images
import dashLogoImage from "../../assets/images/dashboard/dash-logo.svg";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSublinks, setShowSublinks] = useState(false);

  const isHostNull = user.org_role === 0;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const showSublinksOnce = () => {
    setShowSublinks(true);
    sessionStorage.setItem("showSublinks", "true");
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    // Check if the session storage has been initialized
    if (sessionStorage.getItem("showSublinks") === null) {
      // If not, set it to false
      sessionStorage.setItem("showSublinks", "false");
    } else {
      // Otherwise, use the stored value
      const savedShowSublinks =
        sessionStorage.getItem("showSublinks") === "true";
      setShowSublinks(savedShowSublinks);
    }
  }, []);

  useEffect(() => {
    // Reset sublinks to false on page reload
    const handleBeforeUnload = () => {
      sessionStorage.setItem("showSublinks", "false");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
              to="/attend"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
              onClick={closeSidebar}
            >
              Attend
            </NavLink>
          </li>
          <li>
            {isHostNull ? (
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
                  onClick={showSublinksOnce}
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
