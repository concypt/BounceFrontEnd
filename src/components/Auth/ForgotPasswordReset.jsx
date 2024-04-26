import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

const ForgotPasswordReset = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Here you would handle the password reset logic
    // For demonstration purposes, let's just display a success message and redirect to login page
    setSuccessMessage("Password has been reset successfully!");
    setTimeout(() => {
      navigate("/login"); // Redirect to login page after 2 seconds
    }, 1500);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      <div className={styles.loginBg}>
        <div className={`row ${styles.loginRow}`}>
          <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
            <div className={styles.loginLeft}>
              <div className={styles.logiLogo}>
                <a href="#">
                  <img src="images/whiteLogo.svg" alt="" />
                </a>
              </div>
              <div className={styles.loginContent}>
                <h2>Looking to sign up?</h2>
                <p>
                  Start attending incredible club nights, festivals and live
                  music events near you by signing up for a free account today.
                </p>
                <a href="#">Back to login</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className={styles.loginForm}>
              <div className={styles.conditionsText}>
                <p className={styles.terms}>
                  <a href="#">Terms </a> | <a href="#">Privacy</a>
                </p>
                <a href="#" className={styles.createAccount}>
                  Back to login
                </a>
              </div>
              <div className={styles.secondLogo}>
                <a href="#">
                  <img src="images/whiteLogo.svg" alt="" />
                </a>
              </div>
              <div className={styles.formsSection}>
                <h2 className={styles.resetPassword}>Reset Password</h2>
                <form onSubmit={handleChangePassword}>
                  <div className={styles.inputFields}>
                    <input
                      type="password"
                      value={password}
                      onChange={handleChange}
                      required
                      placeholder="Password"
                    />
                    <img
                      src="images/lock.svg"
                      className={styles.inputImgs}
                      alt=""
                    />
                  </div>
                  <div className={styles.inputFields}>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmChange}
                      required
                      placeholder="Confirm Password"
                    />
                    <img
                      src="images/lock.svg"
                      className={styles.inputImgs}
                      alt=""
                    />
                  </div>
                  <div className={styles.header_btn}>
                    <button className={styles.loginButton} type="submit">
                      {" "}
                      <span>Get a reset code</span>
                    </button>
                  </div>
                  {successMessage && (
                    <div className="success">{successMessage}</div>
                  )}
                  {error && <div className="error">{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <h2>Reset Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form> */}
    </div>
  );
};

export default ForgotPasswordReset;
