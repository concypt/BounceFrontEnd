import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../../api/publicService";
import styles from "./auth.module.css";
//images
import whiteLogo from "../../assets/images/whiteLogo.svg";
import mailIcon from "../../assets/images/mailIcon.svg";

const ForgotPasswordRequest = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [success, setSuccess] = useState(false); // Add success state

  const mutation = useMutation({
    mutationFn: requestPasswordReset,
    mutationKey: [requestPasswordReset],
    onSuccess: (data) => {
      setSuccess(true); // Set success state to true
      setInfoMessage(data.msg);
      console.log(infoMessage);
      setTimeout(() => {
        navigate("/login");
      }, 6000);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    mutation.mutate(email);
  };

  return (
    <div className={styles.loginBg}>
      <div className={`row ${styles.loginRow}`}>
        <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
          <div className={styles.loginLeft}>
            <div className={styles.logiLogo}>
              <Link to="/">
                <img src={whiteLogo} alt="" />
              </Link>
            </div>
            <div className={styles.loginContent}>
              <h2>Looking to sign up?</h2>
              <p>
                Start attending incredible club nights, festivals and live music
                events near you by signing up for a free account today.
              </p>
              <Link to="/login">Back to login</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className={styles.loginForm}>
            <div className={styles.conditionsText}>
              <p className={styles.terms}>
                <Link to="/TermsConditions">Terms </Link> |{" "}
                <Link to="/PrivacyPolicy">Privacy</Link>
              </p>
              <Link to="/login" className={styles.createAccount}>
                Back to login
              </Link>
            </div>
            <div className={styles.secondLogo}>
              <Link to="/">
                <img src={whiteLogo} alt="" />
              </Link>
            </div>
            <div className={styles.formsSection}>
              <h2>Need to reset?</h2>
              <p className={styles.resetText}>
                Enter your email address to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputFields}>
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    disabled={mutation.isLoading} // Disable input during form submission
                  />
                  <img src={mailIcon} className={styles.inputImgs} alt="" />
                </div>
                <div className={styles.header_btn}>
                  <button
                    className={styles.loginButton}
                    type="submit"
                    disabled={mutation.isLoading} // Disable button during form submission
                  >
                    {mutation.isLoading ? (
                      "Sending..."
                    ) : (
                      <span>Get a reset code</span>
                    )}
                  </button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                {success && !error && (
                  <div className={styles.success}>
                    New password has been sent successfully. Please check your email and login with new password.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordRequest;
