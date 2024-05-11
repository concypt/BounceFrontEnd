import { useState } from "react";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function HostDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    instagram: "",
    website: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://bounce.extrasol.co.uk/api/user/apply-host", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from API:", data);
        // Handle success or error response from the API
        // Swal.fire({
        //   icon: "success",
        //   title: "Success",
        //   text: "You are host now.",
        //   timer: 2000,
        //   timerProgressBar: true,
        //   didOpen: () => {
        //     Swal.showLoading();
        //   },
        // }).then(() => {
        //   navigate("/dashboard");
        // });
      })
      .catch((error) => {
        console.error("Error submitting host application:", error);
        // Handle error
      });
  };

  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="tabs">
        <div className="hostSection">
          <h2>Apply to host on Bounce</h2>
          <form onSubmit={handleSubmit}>
            <div className="twoFields">
              <div className="lefFields">
                <div className="inputFields">
                  <label htmlFor="name">Company name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Example Events"
                    className="comapanyName"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputFields">
                  <label htmlFor="instagram">Instagram handle</label>
                  <input
                    type="text"
                    name="instagram"
                    required
                    value={formData.instagram}
                    onChange={handleChange}
                  />
                  <img
                    src="images/greyInsta.svg"
                    className="inputImgs"
                    alt=""
                  />
                </div>
                <div className="inputFields">
                  <label htmlFor="website">Website (optional)</label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://"
                    className="comapanyName"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="inputTextarea">
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  placeholder="Tell us a little bit about the events you plan to host on Bounce..."
                  onChange={handleChange}
                />
                <button className="loginButton" type="submit">
                  <span>Submit Application</span>
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
