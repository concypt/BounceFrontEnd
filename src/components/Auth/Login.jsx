import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://bounce.extrasol.co.uk/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.msg || "An error occurred. Please try again.");
        setSuccess(false);
        return;
      }

      const responseData = await response.json();
      if (!responseData.success) {
        setError(responseData.msg || "An error occurred. Please try again.");
        setSuccess(false);
        return;
      }

      // Login successful
      setSuccess(true);
      setError(null);

      // Redirect to OTP verification page if status is not 1
      if (responseData.data && responseData.data.status !== 1) {
        navigate("/verification", {
          state: { token: responseData.data.token },
        });
        return;
      }

      // Redirect to dashboard or desired page
      // navigate("/dashboard");
    } catch (error) {
      setError("An error occurred. Please try again later.");
      setSuccess(false);
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={`row ${styles.loginRow}`}>
        <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
          <div className={styles.loginLeft}>
            <div className={styles.logiLogo}>
              <a href="/">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={styles.loginContent}>
              <h2>Looking to sign up?</h2>
              <p>
                Start attending incredible club nights, festivals and live music
                events near you by signing up for a free account today.
              </p>
              <a href="register">Sign up</a>
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
                Create an account
              </a>
            </div>
            <div className={styles.secondLogo}>
              <a href="#">
                <img src="images/whiteLogo.svg" alt="" />
              </a>
            </div>
            <div className={styles.formsSection}>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputFields}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                  <img
                    src="images/mailIcon.svg"
                    className={styles.inputImgs}
                    alt=""
                  />
                </div>
                <div>
                  <div className={styles.inputFields}>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
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
                  <div className={styles.forgetDiv}>
                    <a href="/forgot-password-request">Forgot password?</a>
                  </div>
                </div>
                <div className={styles.header_btn}>
                  <button className={styles.loginButton} type="submit">
                    {" "}
                    <span>Sign in</span>
                  </button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                {success && !error && (
                  <div className={styles.success}>Login successful!</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
