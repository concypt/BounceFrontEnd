import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import styles from "./header.module.css";
import Swal from "sweetalert2";

//images
import baseImage from "../../assets/images/base.svg";
import dashboardProfile from "../../assets/images/dashboard/dashboardProfile.svg";
import dashboardSetting from "../../assets/images/dashboard/dashboardSetting.svg";
import dashboardLogout from "../../assets/images/dashboard/dashboardLogout.svg";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, deactivateAccount } = useContext(UserContext);
  //console.log(user.imagePath);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will be logged out of your account.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        // navigate("/login");
         window.location.href = "/login";
      }
    });
  };
  const handleAccountDeactivate = () => {
    Swal.fire({
      title: "Are you sure you want to deactivate your account?",
      text: "Your account will be deactivated and you will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "No, keep my account",
    }).then((result) => {
      if (result.isConfirmed) {
        deactivateAccount(); // Rename this method to match the action
        navigate("/login");
      }
    });
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
        <h3>{user?.first_name + " " + user?.last_name}</h3>{" "}
        <span className={styles.caret}></span>
        <img src={user?.imagePath ? user.imagePath : baseImage} alt="" />
        <ul className={`${styles.dropdownMenu} ${styles.dropdownMenu1}`}>
          <li>
            <Link to={`/profile`}>
              <img
                src={dashboardProfile}
                className={styles.dashboardProfileIcon}
                alt="Profile"
              />
              Profile
            </Link>
          </li>
        
          <li>
            <img src={dashboardSetting} alt="Settings" />
            <Link to={`/contact`}>Help</Link>
          </li>
          <li onClick={handleAccountDeactivate} >
          <img
                src={dashboardProfile}
                className={styles.dashboardProfileIcon}
                alt="Profile"
              />
           <a className={styles.logoutLink} onClick={handleAccountDeactivate}>Deactivate</a>
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
