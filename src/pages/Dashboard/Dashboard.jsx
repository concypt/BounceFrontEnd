import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function Dashboard() {
  const navigate = useNavigate(); // Import useNavigate
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null);
  const toast = document.getElementById("toast");

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (!token) {
      // Token doesn't exist, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    function handleImageLoad() {
      setShowToast(true);
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
    // Handle file input change here
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
                          src="images/base.svg"
                          alt=""
                        />
                      </label>
                      {showToast && <div id="toast">Image Uploaded</div>}
                    </div>
                    <div className="twoFields">
                      <div className="inputFields">
                        <input
                          type="text"
                          name="first_name"
                          // value={formData.first_name}
                          // onChange={handleChange}
                          required
                          placeholder="First Name"
                        />
                        <img
                          src="images/name.svg"
                          className="inputImgs"
                          alt=""
                        />
                      </div>
                      <div className="inputFields">
                        <input
                          type="text"
                          name="last_name"
                          // value={formData.last_name}
                          // onChange={handleChange}
                          required
                          placeholder="Last Name"
                        />
                        <img
                          src="images/name.svg"
                          className="inputImgs"
                          alt=""
                        />
                      </div>
                      <div className="inputFields">
                        <input
                          type="email"
                          name="email"
                          // value={formData.email}
                          // onChange={handleChange}
                          required
                          placeholder="Email"
                        />
                        <img
                          src="images/mailIcon.svg"
                          className="inputImgs"
                          alt=""
                        />
                      </div>
                      <div className="inputFields">
                        <input
                          type="email"
                          name="email"
                          // value={formData.email}
                          // onChange={handleChange}
                          required
                          placeholder="Email"
                        />
                        <img
                          src="images/mailIcon.svg"
                          className="inputImgs"
                          alt=""
                        />
                      </div>
                    </div>
                    <button
                      className="loginButton"
                      type="submit"
                      // disabled={isSubmitting} // Disable button when isSubmitting is true
                    >
                      {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
                      <span>Save changes</span>
                      {/* )} */}
                    </button>
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
                    <button
                      className="loginButton"
                      type="submit"
                      // disabled={isSubmitting} // Disable button when isSubmitting is true
                    >
                      {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
                      <span>Create account</span>
                      {/* )} */}
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
