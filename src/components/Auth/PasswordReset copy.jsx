import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";

import styles from "./auth.module.css";
import Swal from "sweetalert2";

import lockImage from "../../assets/images/lock.svg";

const PasswordReset = () => {
  const { user } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            old_password: oldPassword,
            password: password,
            password_confirmation: confirmPassword,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log("responseData", responseData);
        throw new Error(responseData.message || "Failed to reset password");
      }
      if (responseData.success === false) {
        Swal.fire({
          icon: "info",
          title: "Error",
          text: responseData.msg || "Please check again",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: responseData.msg || "Password has been reset successfully!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to reset password",
      });
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  return (
    <div>
      <div className={styles.formsSection}>
        <form onSubmit={handleChangePassword}>
          <div className={styles.inputFields}>
            <input
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              required
              placeholder="Old Password"
              className={styles.dashboardInput}
            />
          </div>
          <div className={styles.inputFields}>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="Password"
              className={styles.dashboardInput}
            />
            <img src={lockImage} className={styles.inputImgs} alt="" />
          </div>
          <div className={styles.inputFields}>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmChange}
              required
              placeholder="Confirm Password"
              className={styles.dashboardInput}
            />
            <img src={lockImage} className={styles.inputImgs} alt="" />
          </div>
          <div className={styles.header_btn}>
            <button className={styles.resetPasswordButton} type="submit">
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
