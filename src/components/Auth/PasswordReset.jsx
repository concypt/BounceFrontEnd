import { useState } from "react";
import styles from "./auth.module.css";
import Swal from "sweetalert2";

const PasswordReset = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            old_password: oldPassword,
            password,
            password_confirmation: confirmPassword,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.msg || "Failed to reset password");
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password has been reset successfully!",
      }).then(() => {
        // Redirect to login page or any other action
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to reset password",
      });
    } finally {
      setLoading(false);
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
        <h2 className={styles.resetPassword}>Reset Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className={styles.inputFields}>
            <input
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              required
              placeholder="Old Password"
            />
          </div>
          <div className={styles.inputFields}>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <img src="images/lock.svg" className={styles.inputImgs} alt="" />
          </div>
          <div className={styles.inputFields}>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmChange}
              required
              placeholder="Confirm Password"
            />
            <img src="images/lock.svg" className={styles.inputImgs} alt="" />
          </div>
          <div className={styles.header_btn}>
            <button
              className={styles.loginButton}
              type="submit"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}{" "}
            </button>
            {loading && <span className={styles.loadingIndicator} />}{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
