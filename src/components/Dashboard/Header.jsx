import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import styles from "./header.module.css";
import Swal from "sweetalert2";

//images
import baseImage from "../../assets/images/base.svg";
import dashboardProfile from "../../assets/images/dashboard/user.svg";
import dashboardSetting from "../../assets/images/dashboard/dashboardSetting.svg";
import dashboardLogout from "../../assets/images/dashboard/dashboardLogout.svg";
import userDelete from "../../assets/images/dashboard/delete-user.svg";

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
        navigate("/login");
      }
    });
  };
  const handleAccountDeactivate = () => {
    Swal.fire({
      title: "Are you sure you want to delete your account?",
      html: "We're sorry to see you go! <br> Deleting your account will permanently erase all your data, and this action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete my acount",
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
          <li onClick={handleAccountDeactivate} className={styles.deleteUser}>
            <img
              src={userDelete}              
              alt="Profile"
            />
            <a className={styles.logoutLink} onClick={handleAccountDeactivate}>
              Delete Account
            </a>
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
