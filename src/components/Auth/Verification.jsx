import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP, resendOTP } from "../../api/publicService";
import styles from "./auth.module.css";
//images
import whiteLogo from "../../assets/images/whiteLogo.svg";
import otpImage from "../../assets/images/otp.png";

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOTP] = useState("");
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({ otp: ""});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    // Access token from location state
    const token = location.state && location.state.token;
    if (!token) {
      // Handle case when token is not available
      navigate("/login"); // Redirect to login page
    }
    console.log("token=>" + token);
  }, [location, navigate]);

  const mutation = useMutation({
    mutationFn: verifyOTP,
    mutationKey: ["verifyOTP"],
    onSuccess: (data) => {
      console.log(data);
      if(data.success===true){
      setVerificationStatus("success");
      setLoading(false);
      // Redirect after 2 seconds only if verification is successful
      navigate("/attend");
    }
    else{
      setVerificationStatus("failure");
      setLoading(false);
    }
    },
    onError: (error) => {
      console.error("OTP failedd:", error);
    },
  });

  const mutationResend = useMutation({
    mutationFn: resendOTP,
    mutationKey: ["resendOTP"],
    onSuccess: (data) => {
      setResendCount((prevCount) => prevCount + 1);
      setVerificationStatus("success");
      setLoading(false);
      // Redirect after 2 seconds only if verification is successful
      setTimeout(() => {
        navigate("/login"); // Redirect to home page
      }, 3000);
    },
    onError: (error) => {
      console.error("OTP failed:", error);
    },
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      otp: value,
    }));
    setOTP(e.target.value);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);

    // Disable button and set loading state
    setLoading(true);

    //call mutation here

    mutation.mutate(formData);
  };
  const handleResendOTP = async () => {
    mutationResend.mutate(location.state.token);
  };

  return (
    <div className={styles.registerbg}>
      <div className={`row ${styles.loginRow}`}>
        <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
          <div className={styles.loginLeft}>
            <div className={styles.logiLogo}>
              <a href="/">
                <img src={whiteLogo} alt="" />
              </a>
            </div>
            <div className={styles.loginContent}>
              <h2>OTP Verification</h2>
              <p>Enter the OTP sent to your email or phone number.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-6">
          <div className={styles.loginForm}>
            <div className={styles.secondLogo}>
              <a href="#">
                <img src={whiteLogo} alt="" />
              </a>
            </div>
            <div className={`${styles.formsSection} ${styles.otpSection}`}>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className={styles.inputFields}>
                    <input
                      type="text"
                      value={otp}
                      onChange={handleChange}
                      required
                      placeholder="Enter OTP"
                      disabled={loading} // Disable input during loading
                    />
                    <img src={otpImage} className={styles.inputImgs} alt="" />
                  </div>
                  <div className={styles.forgetDiv}>
                    <button
                      type="button"
                      className={styles.resendOTP}
                      disabled={loading}
                      onClick={handleResendOTP}
                    >
                      {loading2 ? "Resending..." : "Resend OTP"}
                    </button>
                  </div>
                </div>
                <div className={styles.header_btn}>
                  <button
                    className={styles.loginButton}
                    type="submit"
                    disabled={loading} // Disable button during loading
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                {verificationStatus === "success" ? (
                  <p className={styles.success}>
                    OTP verification successful! Redirecting...
                  </p>
                ) : verificationStatus === "failure" ? (
                  <p className={styles.error}>
                    OTP did not match. Please try again.
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
