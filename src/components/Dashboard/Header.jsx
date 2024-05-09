import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";

//images
import baseImage from "../../assets/images/base.svg";
import dashboardProfile from "../../assets/images/dashboard/dashboardProfile.svg";
import dashboardSetting from "../../assets/images/dashboard/dashboardSetting.svg";
import dashboardLogout from "../../assets/images/dashboard/dashboardLogout.svg";

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
        <img src={userImage ? userImage : baseImage} alt="" />
        <ul className={`${styles.dropdownMenu} ${styles.dropdownMenu1}`}>
          <li>
            <Link to={`/dashboard`}>
              <img src={dashboardProfile} alt="Profile" />
              Profile
            </Link>
          </li>
          <li>
            <img src={dashboardSetting} alt="Settings" />
            <Link>Help</Link>
          </li>
          <li onClick={handleLogout} className={styles.lastLi}>
            <img src={dashboardLogout} alt="Logout" />
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
