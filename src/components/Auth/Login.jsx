import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../../contexts/UserProvider";
import styles from "./auth.module.css";
import "react-toastify/dist/ReactToastify.css";
//images
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

  const mutation = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: (data) => {
      console.log(data);
      setSuccess(true);
      setError(null);
      const followingArray = data.following;
      localStorage.setItem("followingArray", JSON.stringify(followingArray));

      if (data && data.status !== 1) {
        navigate("/verification", {
          state: { token: data.access_token },
        });
      } else {
        const redirectTo = location.state?.from || "/dashboard";
        navigate(redirectTo);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
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
                <a href="#">Terms </a> | <a href="#">Privacy</a>
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
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Password"
                    />
                    <img src={lockIcon} className={styles.inputImgs} alt="" />
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
