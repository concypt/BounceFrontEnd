import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/publicService";
import styles from "./auth.module.css";
//images
import whiteLogo from "../../assets/images/whiteLogo.svg";
import mailIcon from "../../assets/images/mailIcon.svg";
import nameIcon from "../../assets/images/name.svg";
import phoneIcon from "../../assets/images/phone.png";
import lockIcon from "../../assets/images/lock.svg";

const RegisterPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    mutationKey: [registerUser],
    onSuccess: (data) => {
      const token = data.token;
      setToken(token);
      setTimeout(() => {
        navigate("/verification", { state: { token } });
      }, 2000);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords don't match");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className={styles.registerbg}>
      <div className={`row ${styles.loginRow}`}>
        <div className={`col-md-6 col-lg-6 ${styles.firstCol}`}>
          <div className={styles.loginLeft}>
            <div className={styles.logiLogo}>
              <Link to="/">
                <img src={whiteLogo} alt="" />
              </Link>
            </div>
            <div className={styles.loginContent}>
              <h2>Got an account?</h2>
              <p>
                Attend, promote and host events all from one place on Bounce,
                the all in one ticketing platform.
              </p>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-6">
          <div className={styles.loginForm}>
            <div className={styles.secondLogo}>
<<<<<<< HEAD
              <Link to="/">
=======
              <a href="/">
>>>>>>> dev-masab
                <img src={whiteLogo} alt="" />
              </Link>
            </div>
            <div className={styles.conditionsText}>
              <a href="/login" className={styles.createAccount}>
                Login
              </a>
            </div>
            <div className={`${styles.formsSection} ${styles.registerSection}`}>
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.twoFields}>
                  <div className={styles.inputFields}>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      placeholder="First Name"
                    />
                    <img src={nameIcon} className={styles.inputImgs} alt="" />
                  </div>
                  <div className={styles.inputFields}>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      placeholder="Last Name"
                    />
                    <img src={nameIcon} className={styles.inputImgs} alt="" />
                  </div>
                </div>
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
                <div className={styles.inputFields}>
                  <input
                    type="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone"
                  />
                  <img src={phoneIcon} className={styles.inputImgs} alt="" />
                </div>
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
                <div className={styles.inputFields}>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    placeholder="Confirm Password"
                  />
                  <img src={lockIcon} className={styles.inputImgs} alt="" />
                </div>
                <div className={styles.header_btn}>
                  <button
                    className={styles.loginButton}
                    type="submit"
                    // Disable button when isSubmitting is true
                  >
                    <span>Create account</span>
                  </button>
                </div>
                {error && (
                  <div
                    className={styles.error}
                    dangerouslySetInnerHTML={{ __html: error }}
                  />
                )}
                {/* {isSuccess && (
                  <p className={styles.success}>
                    Registration successful! Redirecting...
                  </p>
                )} */}
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
