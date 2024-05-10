import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import PasswordReset from "../../components/Auth/PasswordReset";
import BankDetails from "../../components/User/BankDetails";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
//images
import name from "../../assets/images/name.svg";
import phone from "../../assets/images/phone.png";
import baseImage from "../../assets/images/base.svg";

function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const fname = localStorage.getItem("fname");
  const lname = localStorage.getItem("lname");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const userImage = localStorage.getItem("userImage");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    first_name: fname,
    last_name: lname,
    phone: phoneNumber,
    image: null,
  });

  useEffect(() => {
    function handleImageLoad() {
      console.log("Image loaded");
    }

    const img = document.getElementById("img-preview");
    if (img) {
      img.addEventListener("load", handleImageLoad);
    }

    return () => {
      if (img) {
        img.removeEventListener("load", handleImageLoad);
      }
    };
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));

      // Display image preview
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.getElementById("img-preview");
        if (img) {
          img.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileInfoUpdate = async () => {
    try {
      const formDataToSend = new FormData();

      // Append non-empty fields to the form data
      if (formData.first_name.trim() !== "") {
        formDataToSend.append("first_name", formData.first_name);
      }
      if (formData.last_name.trim() !== "") {
        formDataToSend.append("last_name", formData.last_name);
      }
      if (formData.phone.trim() !== "") {
        formDataToSend.append("phone", formData.phone);
      }
      // Add image data if available
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      // Check if any data is being sent
      if (
        formDataToSend.has("first_name") ||
        formDataToSend.has("last_name") ||
        formDataToSend.has("phone") ||
        formDataToSend.has("image")
      ) {
        const response = await fetch(
          "https://bounce.extrasol.co.uk/api/user/edit-profile",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Profile information updated successfully:", response.data);
      } else {
        console.log("No data to update");
      }
    } catch (error) {
      console.error("Error updating profile information:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if either profile information or image is updated
    const isProfileInfoUpdated =
      formData.first_name !== fname ||
      formData.last_name !== lname ||
      formData.phone !== phoneNumber ||
      formData.image !== null;

    if (!isProfileInfoUpdated) {
      console.log("No changes to submit");
      Swal.fire("", "Nothing to Update", "warning");
      return;
    }

    try {
      await handleProfileInfoUpdate();
      let anyFieldUpdated = false;

      if (formData.first_name) {
        localStorage.setItem("fname", formData.first_name);
        anyFieldUpdated = true;
      }
      if (formData.last_name) {
        localStorage.setItem("lname", formData.last_name);
        anyFieldUpdated = true;
      }
      if (formData.phone) {
        localStorage.setItem("phoneNumber", formData.phone);
        anyFieldUpdated = true;
      }

      if (formData.image) {
        // Display image preview
        const reader = new FileReader();
        reader.onload = () => {
          // Store image data in localStorage as data URL
          localStorage.setItem("userImage", reader.result);
        };
        reader.readAsDataURL(formData.image);
        anyFieldUpdated = true;
      }

      if (anyFieldUpdated) {
        Swal.fire(
          "Updated!",
          "Profile information updated successfully",
          "success"
        );
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting changes:", error.message);
      Swal.fire("Error!", "Failed to update profile information.", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: prevState[name] !== value ? value : prevState[name],
    }));
  };

  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="tabs">
        <div className="tabSection">
          <h2>Profile</h2>
          <div id="tabs">
            <input type="radio" id="button-1" name="tab" defaultChecked />
            <input type="radio" id="button-2" name="tab" />
            <input type="radio" id="button-3" name="tab" />
            <input type="radio" id="button-4" name="tab" />
            <ul id="menu">
              <li className="tab-1-li">
                <label htmlFor="button-1">Details</label>
              </li>
              <li className="tab-2-li">
                <label htmlFor="button-2">Security</label>
              </li>
              <li className="tab-3-li">
                <label htmlFor="button-3">Bank Details</label>
              </li>
              <li className="tab-4-li">
                <label htmlFor="button-4">Host Profile</label>
              </li>
              <li className="bg"></li>
            </ul>
            <div id="shadow">
              <div id="content">
                <div id="tab-1">
                  <div className="left">
                    <div className="placeImg">
                      <input
                        id="file-input"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                      />
                      <label htmlFor="file-input" className="inputImg">
                        <img
                          className="baseImg"
                          id="img-preview"
                          src={
                            formData.image
                              ? URL.createObjectURL(formData.image)
                              : userImage || baseImage
                          }
                          alt=""
                        />
                      </label>
                      <div id="toast">Image Uploaded</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="twoFields">
                        <div className="inputFields">
                          <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First Name"
                          />
                          <img src={name} className="inputImgs" alt="" />
                        </div>
                        <div className="inputFields">
                          <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last Name"
                          />
                          <img src={name} className="inputImgs" alt="" />
                        </div>
                        <div className="inputFields">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                          />
                          <img src={phone} className="inputImgs" alt="" />
                        </div>
                      </div>
                      <button className="loginButton" type="submit">
                        <span>Save changes</span>
                      </button>
                    </form>
                  </div>
                  <div className="right"></div>
                </div>
                <div id="tab-2">
                  <div className="left">
                    <PasswordReset />
                  </div>
                  <div className="right"></div>
                </div>
                <div id="tab-3">
                  <div className="left">
                    <BankDetails />
                  </div>
                  <div className="right"></div>
                </div>
                <div id="tab-4">
                  <div className="left">
                    <h4>Apply for host profile</h4>
                    <p>Youre not a host</p>
                    <Link
                      to="/dashboard-host"
                      className="loginButton"
                      type="submit"
                    >
                      <span>Create account</span>
                    </Link>
                  </div>
                  <div className="right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
