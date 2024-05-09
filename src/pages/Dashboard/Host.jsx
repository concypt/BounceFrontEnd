//import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function HostDashboard() {
  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="tabs">
        <div className="hostSection">
          <h2>Apply to host on Bounce</h2>
          <form action="submit">
            <div className="twoFields">
              <div className="lefFields">
                <div className="inputFields">
                  <label htmlFor="">Company name</label>
                  <input
                    type="text"
                    name="first_name"
                    // value={formData.first_name}
                    // onChange={handleChange}
                    required
                    placeholder="Example Events"
                    className="comapanyName"
                  />
                </div>
                <div className="inputFields">
                  <label htmlFor="">Instagram handle</label>
                  <input
                    type="text"
                    name="last_name"
                    // value={formData.last_name}
                    // onChange={handleChange}
                    required
                  />
                  <img
                    src="images/greyInsta.svg"
                    className="inputImgs"
                    alt=""
                  />
                </div>
                <div className="inputFields">
                  <label htmlFor="">Website (optional)</label>
                  <input
                    type="url"
                    name="email"
                    // value={formData.email}
                    // onChange={handleChange}
                    required
                    placeholder="https://"
                    className="comapanyName"
                  />
                  {/* <img src="images/https.svg" className="inputImgs" alt="" /> */}
                </div>
              </div>
              <div className="inputTextarea">
                <textarea id="w3review" name="w3review">
                  Tell us a little bit about the events you plan to host on
                  Bounce...
                </textarea>
                <button
                  className="loginButton"
                  type="submit"
                  // disabled={isSubmitting} // Disable button when isSubmitting is true
                >
                  {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
                  <span>Submit Application</span>
                  {/* )} */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default HostDashboard;
