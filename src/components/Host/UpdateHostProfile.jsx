// export default EditHost;
import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../contexts/UserProvider";
import Swal from "sweetalert2";
import greyInsta from "../../assets/images/greyInsta.svg";
import { updateHostProfile } from "../../api/secureService";

function EditHost() {
  const { user, updateUser } = useContext(UserContext);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: user.name || "",
    instagram: user.instagram || "",
    website: user.website || "",
    bio: user.bio || "",
  });

  const mutation = useMutation({
    mutationFn: (formDataToSend) =>
      updateHostProfile(formDataToSend, user.token),
    onSuccess: (data) => {
      updateUser(data); // Assuming updateUser updates the user context
      Swal.fire("Updated!", "Host information updated successfully", "success");
      queryClient.invalidateQueries(["user"]); // Invalidate user query
    },
    onError: (error) => {
      console.error("Error updating Host information:", error.message);
      Swal.fire("Error!", "Failed to update Host information", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare formDataToSend
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
    if (formData.website.trim() !== "") {
      formDataToSend.append("website", formData.website);
    }

    // Check if any data is being sent
    if (
      formDataToSend.has("name") ||
      formDataToSend.has("instagram") ||
      formDataToSend.has("website") ||
      formDataToSend.has("bio")
    ) {
      mutation.mutate(formDataToSend);
    } else {
      // console.log("No data to update");
      Swal.fire("", "Nothing to Update", "warning");
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
              <label htmlFor="description">Description</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                placeholder="Tell us a little bit about the events you plan to host on Bounce..."
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="loginButton" type="submit">
            <span>Update host details</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditHost;
