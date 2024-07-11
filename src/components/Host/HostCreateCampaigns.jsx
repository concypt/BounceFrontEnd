import { useState, useContext, useRef, useCallback, useEffect } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createEvent, getEvent, updateEvent } from "../../api/secureService";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TagsInput from "../Host/TagsInput";
import Loader from "../utils/Loader";
import { CatContext } from "../../contexts/GlobalProvider";
import ImageUpload from "../ImageUpload";
import Swal from "sweetalert2";
import DateTimePicker from "./DateTimePicker";
import {
  createCampaign,
  fetchCampaignData,
  updateCampaign,
} from "../../api/musecureService";

const HostCreateCampaigns = ({ list }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [campData, setCampData] = useState({
    campaign_id: id || null,
    name: "",
    subject: "",
    audience: [],
    event_id: [],
    body: "",
  });
  const {
    data: campaignData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["campaignData", campData.campaign_id],
    queryFn: fetchCampaignData, // Your function to fetch campaign data
    enabled: !!campData.campaign_id, // Only fetch data if campaign_id is truthy
  });

  useEffect(() => {
    if (campaignData) {
      // Update campData state with fetched campaignData

      setCampData({
        ...campData,
        name: campaignData.name,
        subject: campaignData.subject,
        audience: campaignData.audience
          ? campaignData.audience.split(",").map(Number)
          : [],
        event_id: campaignData.event_id
          ? campaignData.event_id.split(",").map(Number)
          : [],
        body: campaignData.body,
      });
    }
  }, [campaignData]);

  const mutation = useMutation({
    mutationFn: createCampaign,
    mutationKey: ["createCampaign"],
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Campaign created successfully!",
        timer: 2000,
      });
      navigate(`/dashboard-marketing`);
      setCampData({
        name: "",
        subject: "",
        audience: [],
        event_id: [],
        body: "",
      });
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to create event: ${error.message}`, "error");
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateCampaign,
    mutationKey: ["updateCampaign"],
    onSuccess: () => {
      navigate(`/dashboard-marketing`);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Campaign Updated successfully!",
        timer: 2000,
      });
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to create event: ${error.message}`, "error");
    },
  });
  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedEventIds = [...campData.event_id];

    if (checked) {
      updatedEventIds.push(Number(value)); // Push the number value to the array
    } else {
      updatedEventIds = updatedEventIds.filter((id) => id !== Number(value));
    }

    setCampData({
      ...campData,
      event_id: updatedEventIds,
    });
  };
  const handleCheckboxChangeSubscriber = (e) => {
    const { value, checked } = e.target;
    let updatedaudiance = [...campData.audience]; // Make a copy of the current event_ids array

    if (checked) {
      updatedaudiance.push(value); // Add the value to the array if checkbox is checked
    } else {
      updatedaudiance = updatedaudiance.filter((id) => id !== value); // Remove the value if checkbox is unchecked
    }

    setCampData({
      ...campData,
      audience: updatedaudiance, // Update the event_ids array in the formData state
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampData({ ...campData, [name]: value });
  };

  const handleEventIdChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setCampData({
      ...campData,
      event_id: selectedOptions,
    });
  };
  const handleAudienceChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setCampData({
      ...campData,
      audience: selectedOptions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (campaignData) {
      updateMutation.mutate(campData);
    } else {
      mutation.mutate(campData);
    }
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-card create-compaign-form">
          <div className="row">
            <div className="create-event-form-header">
              <h2 className="fs-title mb-4">
                {" "}
                {campData.campaign_id != null
                  ? "Update Campaign"
                  : "Create Campaign"}
              </h2>
            </div>
          </div>
          <div className="eventFields">
            <div className="eventLables">
              <label className="fieldlabels">Campaign Name</label>
              <input
                type="text"
                name="name"
                value={campData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div className="eventLables">
              <label className="fieldlabels">Campaign Subject</label>
              <input
                type="text"
                name="subject"
                value={campData.subject}
                onChange={handleChange}
                placeholder="Subject"
              />
            </div>
          </div>
          <div className="eventFields">
            <div className="eventLables">
              <label className="fieldlabels">Event Audience</label>
              <div
                className="popupInputTextarea"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* Dynamically render checkboxes */}
                {list.events.map((event) => (
                  <div
                    key={event.id}
                    style={{
                      marginBottom: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`event_${event.id}`}
                      name={`event_id`}
                      value={event.id}
                      checked={campData && campData.event_id.includes(event.id)}
                      className="myCustomMultiSelectCheckboxes"
                      onChange={handleCheckboxChange}
                      style={{ marginRight: "13px" }} // Optional: Add spacing between checkbox and label
                    />
                    <label htmlFor={`event_${event.id}`}>
                      {event.name.length > 40
                        ? event.name.slice(0, 40) + "..."
                        : event.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="eventLables">
              <label className="fieldlabels">Audiance List</label>
              <div
                className="popupInputTextarea"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* Dynamically render checkboxes */}
                {list.subscribe.map((row) => (
                  <div
                    key={row.id}
                    style={{
                      marginBottom: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`subscriber_${row.id}`}
                      name={`audience`}
                      value={row.id}
                      className="myCustomMultiSelectCheckboxes"
                      onChange={handleCheckboxChangeSubscriber}
                      style={{ marginRight: "13px" }}
                    />
                    <label htmlFor={`subscriber_${row.id}`}>
                      {row.name.length > 40
                        ? row.name.slice(0, 40) + "..."
                        : row.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="eventFields mt-3">
            <div className="eventLables">
              <textarea
                name="body"
                value={campData.body}
                onChange={handleChange}
                placeholder="Description"
              ></textarea>
            </div>
          </div>
        </div>
        <button name="next" className="next-create-event action-button">
          <span>Save Campaign</span>
        </button>
      </form>
    </>
  );
};

HostCreateCampaigns.propTypes = {
  list: PropTypes.object.isRequired,
};
export default HostCreateCampaigns;
