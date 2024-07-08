// import { useState, useContext } from "react";
// import { UserContext } from "../../contexts/UserProvider";
// import { changePassword } from "../../api/secureService"; // Ensure this path is correct
// import styles from "./auth.module.css";
// import Swal from "sweetalert2";
// import lockImage from "../../assets/images/lock.svg";

// const PasswordReset = () => {
//   const { user } = useContext(UserContext);
//   const [oldPassword, setOldPassword] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleChangePassword = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Passwords do not match",
//       });
//       return;
//     }

//     try {
//       const response = await axios.post("/user/change-password", {
//         old_password: oldPassword,
//         password: password,
//         password_confirmation: confirmPassword,
//       });

//       const responseData = response.data;

//       if (responseData.success === false) {
//         Swal.fire({
//           icon: "info",
//           title: "Error",
//           text: responseData.msg || "Please check again",
//         });
//       } else {
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: responseData.msg || "Password has been reset successfully!",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to reset password",
//       });
//     }
//   };

//   return (
//     <div>
//       <div className={styles.formsSection}>
//         <form onSubmit={handleChangePassword}>
//           <div className={styles.inputFields}>
//             <input
//               type="password"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               required
//               placeholder="Old Password"
//               className={styles.dashboardInput}
//             />
//           </div>
//           <div className={styles.inputFields}>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Password"
//               className={styles.dashboardInput}
//             />
//             <img src={lockImage} className={styles.inputImgs} alt="Lock" />
//           </div>
//           <div className={styles.inputFields}>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               placeholder="Confirm Password"
//               className={styles.dashboardInput}
//             />
//             <img src={lockImage} className={styles.inputImgs} alt="Lock" />
//           </div>
//           <div className={styles.header_btn}>
//             <button className={styles.resetPasswordButton} type="submit">
//               <span>Change Password</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PasswordReset;

import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/secureService";
import Swal from "sweetalert2";
import styles from "./auth.module.css";
import lockImage from "../../assets/images/lock.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordReset = () => {
  const { user } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ oldPassword, newPassword, newPasswordConfirmation }) =>
      changePassword(oldPassword, newPassword, newPasswordConfirmation),
    onSuccess: (data) => {
      if (data.success === false) {
        Swal.fire({
          icon: "info",
          title: "Error",
          text: data.msg || "Please check again",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.msg || "Password has been reset successfully!",
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to reset password",
      });
    },
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match",
      });
      return;
    }

    mutation.mutate({
      oldPassword,
      newPassword: password,
      newPasswordConfirmation: confirmPassword,
    });
  };

  return (
    <div>
      <div className={styles.formsSection}>
        <form onSubmit={handleChangePassword}>
          <div className={styles.inputFields}>
            <input
              type={showPassword1 ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder="Old Password"
              className={styles.dashboardInput}
            />
            <img src={lockImage} className={styles.inputImgs} alt="Lock" />
            <span
              onClick={() => setShowPassword1(!showPassword1)}
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
                icon={showPassword1 ? faEyeSlash : faEye}
                className="viewPasswordEyeButton"
              />
            </span>
          </div>
          <div className={styles.inputFields}>
            <input
              type={showPassword2 ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className={styles.dashboardInput}
            />
            <img src={lockImage} className={styles.inputImgs} alt="Lock" />
            <span
              onClick={() => setShowPassword2(!showPassword2)}
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
                icon={showPassword2 ? faEyeSlash : faEye}
                className="viewPasswordEyeButton"
              />
            </span>
          </div>
          <div className={styles.inputFields}>
            <input
              type={showPassword3 ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              className={styles.dashboardInput}
            />
            <img src={lockImage} className={styles.inputImgs} alt="Lock" />
            <span
              onClick={() => setShowPassword3(!showPassword3)}
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
                icon={showPassword3 ? faEyeSlash : faEye}
                className="viewPasswordEyeButton"
              />
            </span>
          </div>
          <div className={styles.header_btn}>
            <button
              className={styles.resetPasswordButton}
              type="submit"
              disabled={mutation.isLoading}
            >
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
