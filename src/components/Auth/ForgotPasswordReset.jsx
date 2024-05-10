import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
//images
import whiteLogo from "../../assets/images/whiteLogo.svg";
import mailIcon from "../../assets/images/mailIcon.svg";
import lockIcon from "../../assets/images/lock.svg";

const ForgotPasswordReset = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { token } = useParams();
  const [oldPassword, setOldPassword] = useState(""); // State for old password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token,
            old_password: oldPassword, // Include old_password field
            password,
            password_confirmation: confirmPassword, // Include password_confirmation field
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.msg || "Failed to reset password");
      }
      setSuccessMessage("Password has been reset successfully!");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 2 seconds
      }, 1500);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after form submission completes
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
      <div className={styles.loginBg}>
        <div className={`row ${styles.loginRow}`}>
          <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
            <div className={styles.loginLeft}>
              <div className={styles.logiLogo}>
                <a href="/">
                  <img src={whiteLogo} alt="" />
                </a>
              </div>
              <div className={styles.loginContent}>
                <h2>Looking to sign up?</h2>
                <p>
                  Start attending incredible club nights, festivals and live
                  music events near you by signing up for a free account today.
                </p>
                <a href="/login">Back to login</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className={styles.loginForm}>
              <div className={styles.conditionsText}>
                <p className={styles.terms}>
                  <a href="#">Terms </a> | <a href="#">Privacy</a>
                </p>
                <a href="/login" className={styles.createAccount}>
                  Back to login
                </a>
              </div>
              <div className={styles.secondLogo}>
                <a href="#">
                  <img src={whiteLogo} alt="" />
                </a>
              </div>
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
                    <img src={lockIcon} className={styles.inputImgs} alt="" />
                  </div>
                  <div className={styles.inputFields}>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmChange}
                      required
                      placeholder="Confirm Password"
                    />
                    <img src={lockIcon} className={styles.inputImgs} alt="" />
                  </div>
                  <div className={styles.header_btn}>
                    <button
                      className={styles.loginButton}
                      type="submit"
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? "Resetting..." : "Reset Password"}{" "}
                      {/* Update button text */}
                    </button>
                    {loading && <span className={styles.loadingIndicator} />}{" "}
                    {/* Show loading indicator */}
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
    </div>
  );
};

export default ForgotPasswordReset;
