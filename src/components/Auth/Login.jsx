import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../../contexts/UserProvider";
import styles from "./auth.module.css";
import "react-toastify/dist/ReactToastify.css";
//images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import whiteLogo from "../../assets/images/whiteLogo.svg";
import mailIcon from "../../assets/images/mailIcon.svg";
import lockIcon from "../../assets/images/lock.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const mutation = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: (data) => {
      setSuccess(true);
      setError(null);
      const followingArray = data.following?.split(",").map((x) => {
        return parseInt(x);
      });
      const favEvents = data.favorite?.split(",").map((x) => {
        return parseInt(x);
      });
      const favBlogs = data.favorite_blog?.split(",").map((x) => {
        return parseInt(x);
      });
      localStorage.setItem("followingArray", JSON.stringify(followingArray));
      localStorage.setItem("favEvents", JSON.stringify(favEvents));
      localStorage.setItem("favBlogs", JSON.stringify(favBlogs));

      if (data && data.status !== 1) {
        navigate("/verification", {
          state: { token: data.access_token },
        });
      } else {
        const redirectPath =
          localStorage.getItem("redirectPath") || "/dashboard";
        localStorage.removeItem("redirectPath");
        navigate(redirectPath);
      }
    },
    onError: (error) => {
      setError(error.message);
      //console.error("Login failed:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
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
                <a href="/PrivacyPolicy">Terms </a> |{" "}
                <a href="/TermsConditions">Privacy</a>
              </p>
              <a href="#" className={styles.createAccount}>
                Create an account
              </a>
            </div>
            <div className={styles.secondLogo}>
              <a href="#">
                <img src={whiteLogo} alt="" />
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
                  <img src={mailIcon} className={styles.inputImgs} alt="" />
                </div>
                <div>
                  <div className={styles.inputFields}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Password"
                    />
                    <img src={lockIcon} className={styles.inputImgs} alt="" />
                    <span
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="viewPasswordEyeButton"
                      />
                    </span>
                  </div>
                  <div className={styles.forgetDiv}>
                    <a href="/forgot-password-request">Forgot password?</a>
                  </div>
                </div>
                <div className={styles.header_btn}>
                  <button className={styles.loginButton} type="submit">
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
