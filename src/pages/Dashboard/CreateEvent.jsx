import { useState, useContext, useRef } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useMutation } from "@tanstack/react-query";
import TagsInput from "../../components/Host/TagsInput";
import Loader from "../../components/utils/Loader";
import { CatContext } from "../../contexts/GlobalProvider";
import ImageUpload from "../../components/ImageUpload";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import axios from "axios";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import "./CreateEvent.css";

const URL = "https://bounce.extrasol.co.uk/api/user/event-create";
let config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
  },
};

const createEvent = async (eventData) => {
  const response = await axios.post(URL, eventData, config);
  return response.data;
};

const CreateEvent = () => {
  const [libraries] = useState(["places"]);
  const [eventData, setEventData] = useState({
    name: "",
    category: "",
    tags: [],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    eventType: "Venue",
    location: "",
    latitude: null,
    longitude: null,
    // radius: "",
    link: "",
    description: "",
    images: [],
    status: "Active",
    tickets: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchBoxRef = useRef(null);

  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useContext(CatContext);

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      alert("Event created successfully!");
      // Success actions
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
      // Error actions
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleTagsChange = (tags) => {
    setEventData({ ...eventData, tags });
  };

  const handleImagesChange = (images) => {
    setEventData({ ...eventData, images });
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      setEventData({
        ...eventData,
        location: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventData);
    // mutation.mutate(eventData);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD277hXRfelcfvYnHrqhfV91ikyZpu_TYk", // Replace with your actual Google Maps API key
    libraries,
  });

  if (loadError) return <div>Error loading location</div>;
  if (!isLoaded) return <div>Loading location</div>;

  if (categoriesLoading) {
    return <Loader />;
  }

  if (categoriesError) {
    return <p>Error: {categoriesError.message}</p>;
  }

  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="tabs">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="progressCard">
                  <div className="multiForm">
                    <div id="msform">
                      <ul id="progressbar">
                        <li id="account">
                          <strong>Step 1</strong>
                          <h3>Event details</h3>
                        </li>
                        <li id="personal">
                          <strong>Step 2</strong>
                          <h3>Tickets</h3>
                        </li>
                      </ul>
                      <div className="fieldsetOne">
                        <div className="form-card">
                          <div className="row">
                            <div className="create-event-form-header">
                              <h2 className="fs-title">New Event</h2>
                              <div className="eventLables status">
                                <select
                                  name="status"
                                  value={eventData.status}
                                  onChange={handleChange}
                                  className="form-select form-select-lg"
                                  aria-label=".form-select-lg example"
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <ImageUpload
                                images={eventData.images}
                                onImagesChange={handleImagesChange}
                              />
                            </div>
                          </div>
                          <div className="eventFields">
                            <div className="eventLables">
                              <label className="fieldlabels">Event Name</label>
                              <input
                                type="text"
                                name="name"
                                value={eventData.name}
                                onChange={handleChange}
                                placeholder="Name"
                              />
                            </div>
                            <div className="eventLables">
                              <label className="fieldlabels">
                                Event Category
                              </label>
                              <select
                                name="category"
                                value={eventData.category}
                                onChange={handleChange}
                                className="form-select form-select-lg"
                                aria-label=".form-select-lg example"
                              >
                                {categories.map((category, index) => (
                                  <option key={index} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="eventLables">
                            <label className="fieldlabels" htmlFor="tags">
                              Tags
                            </label>
                            <TagsInput
                              tags={eventData.tags}
                              onTagsChange={handleTagsChange}
                            />
                          </div>
                          <div className="datetime">
                            <div className="datePicker">
                              <label className="fieldlabels">Start date</label>
                              <input
                                type="date"
                                name="startDate"
                                value={eventData.startDate}
                                onChange={handleChange}
                              />
                              <label className="fieldlabels">End date</label>
                              <input
                                type="date"
                                name="endDate"
                                value={eventData.endDate}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="chooseTime">
                              <label className="fieldlabels">Start Time</label>
                              <input
                                type="time"
                                name="startTime"
                                value={eventData.startTime}
                                onChange={handleChange}
                              />
                              <label className="fieldlabels">End Time</label>
                              <input
                                type="time"
                                name="endTime"
                                value={eventData.endTime}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="switch-container">
                            <div
                              className={`eventType ${
                                eventData.eventType === "Venue"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                setEventData({
                                  ...eventData,
                                  eventType: "Venue",
                                })
                              }
                            >
                              Venue
                            </div>
                            <div
                              className={`eventType ${
                                eventData.eventType === "Online"
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                setEventData({
                                  ...eventData,
                                  eventType: "Online",
                                })
                              }
                            >
                              Online
                            </div>
                            <div
                              className={`highlight ${eventData.eventType.toLowerCase()}`}
                            ></div>
                          </div>
                          {eventData.eventType === "Venue" && (
                            <div className="eventLables">
                              <label className="fieldlabels">
                                Event Location
                              </label>
                              <StandaloneSearchBox
                                onLoad={(ref) => (searchBoxRef.current = ref)}
                                onPlacesChanged={onPlacesChanged}
                              >
                                <input
                                  type="text"
                                  placeholder="Search for location"
                                  value={eventData.location}
                                  onChange={(e) =>
                                    setEventData({
                                      ...eventData,
                                      location: e.target.value,
                                    })
                                  }
                                />
                              </StandaloneSearchBox>
                            </div>
                          )}
                          {eventData.eventType === "Online" && (
                            <div className="eventLables">
                              <label className="fieldlabels">Event Link</label>
                              <input
                                type="text"
                                name="link"
                                value={eventData.link}
                                onChange={handleChange}
                              />
                            </div>
                          )}
                          {/* <div className="eventLables">
                            <label className="fieldlabels">
                              Radius (miles)
                            </label>
                            <input
                              type="number"
                              name="radius"
                              value={eventData.radius}
                              onChange={handleChange}
                            />
                          </div> */}
                          <div className="eventLables">
                            <textarea
                              name="description"
                              value={eventData.description}
                              onChange={handleChange}
                              placeholder="Description"
                            ></textarea>
                          </div>
                        </div>
                        <input
                          type="submit"
                          name="next"
                          className="next-create-event action-button"
                          value="Next"
                          disabled={loading}
                        />
                      </div>
                      <div className="fieldsetTwo">
                        <div className="form-card">
                          <h2 className="fs-title">Manage Tickets</h2>
                          <div className="row">
                            <div className="col-lg-6">
                              {/* Add your ticket management components here */}
                            </div>
                            <div className="col-lg-6">
                              {/* Add your ticket management components here */}
                            </div>
                          </div>
                        </div>
                        <div className="multistep-button-wrap">
                          <button
                            className="loginButton previous-create-event"
                            type="button"
                            onClick={() => {
                              /* handle previous step */
                            }}
                          >
                            <span>Prev</span>
                          </button>
                          <button
                            className="loginButton"
                            type="submit"
                            disabled={loading}
                          >
                            <span>Save Event</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading && <Loader />}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
