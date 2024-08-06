import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createCampaign, fetchCampaignData, updateCampaign } from "../../api/musecureService";

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

  const { data: campaignData, error, isLoading } = useQuery({
    queryKey: ["campaignData", campData.campaign_id],
    queryFn: fetchCampaignData,
    enabled: !!campData.campaign_id,
  });

  useEffect(() => {
    if (campaignData) {
      setCampData({
        ...campData,
        name: campaignData.name,
        subject: campaignData.subject,
        audience: campaignData.audience ? campaignData.audience.split(",").map(Number) : [],
        event_id: campaignData.event_id ? campaignData.event_id.split(",").map(Number) : [],
        body: campaignData.body,
      });
    }
  }, [campaignData]);

  const mutation = useMutation({
    mutationFn: createCampaign,
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedEventIds = [...campData.event_id];

    if (checked) {
      updatedEventIds.push(Number(value));
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
    let updatedAudience = [...campData.audience];

    if (checked) {
      updatedAudience.push(Number(value));
    } else {
      updatedAudience = updatedAudience.filter((id) => id !== Number(value));
    }

    setCampData({
      ...campData,
      audience: updatedAudience,
    });
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setCampData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEditorChange = (value) => {
    setCampData((prevState) => ({
      ...prevState,
      body: value,
    }));
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
                {campData.campaign_id != null ? "Update Campaign" : "Create Campaign"}
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
                {list.events.map((event) => (
                  <div
                    key={event.id}
                    style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      id={`event_${event.id}`}
                      name={`event_id`}
                      value={event.id}
                      checked={campData.event_id.includes(event.id)}
                      className="myCustomMultiSelectCheckboxes"
                      onChange={handleCheckboxChange}
                      style={{ marginRight: "13px" }}
                    />
                    <label htmlFor={`event_${event.id}`}>
                      {event.name.length > 40 ? event.name.slice(0, 40) + "..." : event.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="eventLables">
              <label className="fieldlabels">Audience List</label>
              <div
                className="popupInputTextarea"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {list.subscribe.map((row) => (
                  <div
                    key={row.id}
                    style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      id={`subscriber_${row.id}`}
                      name={`audience`}
                      value={row.id}
                      checked={campData.audience.includes(row.id)}
                      className="myCustomMultiSelectCheckboxes"
                      onChange={handleCheckboxChangeSubscriber}
                      style={{ marginRight: "13px" }}
                    />
                    <label htmlFor={`subscriber_${row.id}`}>
                      {row.name.length > 40 ? row.name.slice(0, 40) + "..." : row.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="eventFields mt-3">
            <div className="eventLables">
              <ReactQuill
                value={campData.body}
                onChange={handleEditorChange}
                placeholder="Description"
              />
            </div>
          </div>
        </div>
        <button name="next" className="next-create-event action-button">
          <span>Save campaign</span>
        </button>
      </form>
    </>
  );
};

HostCreateCampaigns.propTypes = {
  list: PropTypes.object.isRequired,
};

export default HostCreateCampaigns;
