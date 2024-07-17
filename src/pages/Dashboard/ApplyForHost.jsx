import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import { UserContext } from "../../contexts/UserProvider";
import { applyHost } from "../../api/secureService";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import greyInsta from "../../assets/images/greyInsta.svg";

function HostDashboard() {
  const { user, updateUser } = useContext(UserContext);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    instagram: "",
    website: "",
    bio: "",
  });

  const mutation = useMutation({
    mutationFn: applyHost,
    mutationKey: ["applyHost"],
    onSuccess: (data) => {
      updateUser(data);
      queryClient.invalidateQueries(["user"]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Congrats! You are now a host.",
        timer: 2000,
      }).then(() => {
        navigate("/dashboard");
      });
    },
    onError: (error) => {
      console.error("Error submitting host application:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue submitting your application. Please try again.",
      });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
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
                  <img src={greyInsta} className="inputImgs" alt="" />
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
                  <span>Submit application</span>
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
