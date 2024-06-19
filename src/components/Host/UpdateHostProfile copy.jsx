import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";

import "../../pages/Dashboard/styles/primaryStyles.css";
import "../../pages/Dashboard/styles/comonStyles.css";
import Swal from "sweetalert2";
//images
import greyInsta from "../../assets/images/greyInsta.svg";

function EditHost() {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: user.name || "",
    instagram: user.instagram || "",
    website: user.website || "",
    bio: user.bio || "",
  });

  const handleHostInfoUpdate = async () => {
    try {
      const formDataToSend = new FormData();

      // Append non-empty fields to the form data
      if (formData.name.trim() !== "") {
        formDataToSend.append("name", formData.name);
      }
      if (formData.instagram.trim() !== "") {
        formDataToSend.append("instagram", formData.instagram);
      }
      if (formData.bio.trim() !== "") {
        formDataToSend.append("bio", formData.bio);
      }

      // Check if any data is being sent
      if (
        formDataToSend.has("name") ||
        formDataToSend.has("instagram") ||
        formDataToSend.has("website") ||
        formDataToSend.has("bio")
      ) {
        const response = await fetch(
          "https://bounce.extrasol.co.uk/api/user/edit-profile",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Host information updated successfully:", response.data);
      } else {
        console.log("No data to update");
      }
    } catch (error) {
      console.error("Error updating Host information:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if either Host information or image is updated
    const isHostInfoUpdated =
      formData.name !== hname ||
      formData.instagram !== insta ||
      formData.website !== web ||
      formData.bio !== bio;

    if (!isHostInfoUpdated) {
      console.log("No changes to submit");
      Swal.fire("", "Nothing to Update", "warning");
      return;
    }

    try {
      await handleHostInfoUpdate();
      let anyFieldUpdated = false;

      if (formData.name) {
        localStorage.setItem("hostName", formData.name);
        anyFieldUpdated = true;
      }
      if (formData.website) {
        localStorage.setItem("website", formData.website);
        anyFieldUpdated = true;
      }
      if (formData.bio) {
        localStorage.setItem("bio", formData.bio);
        anyFieldUpdated = true;
      }

      if (anyFieldUpdated) {
        Swal.fire(
          "Updated!",
          "Host information updated successfully",
          "success"
        );
      }
    } catch (error) {
      console.error("Error submitting changes:", error.message);
      Swal.fire("Error!", "Failed to update Host information.", "error");
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
    <div className="tabs">
      <div className="hostSection">
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
                <span>Update Host Details</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHost;
