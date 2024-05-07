import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function Dashboard() {
  const navigate = useNavigate(); // Import useNavigate
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const fname = localStorage.getItem("fname");
  const lname = localStorage.getItem("lname");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const userImage = localStorage.getItem("userImage");

  useEffect(() => {
    // Check if token exists in local storage
    if (!token) {
      // Token doesn't exist, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    image: null, // New field for storing the selected image
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
      // Make a POST request to the API endpoint for updating profile info
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/user/edit-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Profile information updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile information:", error.message);
    }
  };

  const handleImageUpload = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);

      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/user/change-profile-image",
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

      // Extract the new image path from the response data
      const responseData = await response.json();
      const newImagePath = responseData.imagePath;

      // Store the new image path in local storage
      // localStorage.setItem("userImage", newImagePath);

      // console.log("Image uploaded successfully:", responseData);

      // return newImagePath;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error; // Rethrow the error to handle it in the handleSubmit function
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if either profile information or image is updated
    const isProfileInfoUpdated =
      formData.first_name || formData.last_name || formData.phone;
    const isImageUpdated = formData.image;

    // If neither profile information nor image is updated, do not proceed with submission
    if (!isProfileInfoUpdated && !isImageUpdated) {
      console.log("No changes to submit");
      return;
    }

    try {
      let newImagePath = null;
      if (isImageUpdated) {
        // newImagePath = await handleImageUpload(); // Upload the new image and get the new path
        // console.log("new image" + newImagePath);
        // localStorage.setItem("userImage", newImagePath);
      }
      if (isProfileInfoUpdated) {
        await handleProfileInfoUpdate(); // Update profile information
        localStorage.setItem("fname", formData.first_name);
        localStorage.setItem("lname", formData.last_name);
        localStorage.setItem("phoneNumber", formData.phone);
      }

      // Clear the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting changes:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="dashboard">
      {/* Add your components here */}
      <div>
        <Header />
        <Sidebar />
      </div>
      {/* Render EventList component with the events data */}
      <div className="tabs">
        <div className="tabSection">
          <h2>Profile</h2>
          <div id="tabs">
            <input type="radio" id="button-1" name="tab" defaultChecked />
            <input type="radio" id="button-2" name="tab" />
            <input type="radio" id="button-3" name="tab" />
            <input type="radio" id="button-4" name="tab" />
            <ul id="menu">
              <li>
                <label htmlFor="button-1">Details</label>
              </li>
              <li>
                <label htmlFor="button-2">Security</label>
              </li>
              <li>
                <label htmlFor="button-3">Bank Details</label>
              </li>
              <li>
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
                              : userImage || "images/base.svg"
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
                            placeholder={fname}
                          />
                        </div>
                        <div className="inputFields">
                          <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder={lname}
                          />
                        </div>
                        <div className="inputFields">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={phoneNumber}
                          />
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
                    <h4>iPhone 12</h4>
                    <p>
                      5G speed. A14 Bionic, the fastest chip in a smartphone. An
                      edge-to-edge OLED display. Ceramic Shield with four times
                      better drop performance. And Night mode on every camera.
                      iPhone 12 has it all — in two perfect sizes.
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className="right"></div>
                </div>
                <div id="tab-3">
                  <div className="left">
                    <h4>iPhone SE</h4>
                    <p>
                      iPhone SE packs our powerful A13 Bionic chip into our most
                      popular size at our most affordable price. It’s just what
                      you’ve been waiting for.
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className="right"></div>
                </div>
                <div id="tab-4">
                  <div className="left">
                    <h4>iPhone SE</h4>
                    <p>
                      iPhone SE packs our powerful A13 Bionic chip into our most
                      popular size at our most affordable price. It’s just what
                      you’ve been waiting for.
                    </p>
                    <button className="loginButton" type="submit">
                      <span>Create account</span>
                    </button>
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
