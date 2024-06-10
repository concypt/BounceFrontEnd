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
                              <div className="manageTickets">
                                <div className="tickets">
                                  <div className="ticketLeft">
                                    <h3>Tier 1</h3>
                                    <p>£ 25</p>
                                    <p>9 Available</p>
                                  </div>
                                  <div className="ticketRight">
                                    <img src={dustbin} alt="" />
                                    <div className="ticketArrows">
                                      <img src={ticketArrows} alt="" />
                                      <img src={pencil} alt="" />
                                      <img
                                        src={ticketArrows}
                                        className="arrowTwo"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="tickets">
                                  <div className="ticketLeft">
                                    <h3>Tier 2</h3>
                                    <p>£ 35</p>
                                    <p>12 Available</p>
                                  </div>
                                  <div className="ticketRight">
                                    <img src={dustbin} alt="" />
                                    <div className="ticketArrows">
                                      <img src={ticketArrows} alt="" />
                                      <img src={pencil} alt="" />
                                      <img
                                        src={ticketArrows}
                                        className="arrowTwo"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                <section className="uploadImg">
                                  <header className="uploadBtn">
                                    <input
                                      id="hidden-input"
                                      type="file"
                                      multiple
                                      className="hidden"
                                      onChange={handleFileInputChange}
                                    />
                                    <button
                                      id="button"
                                      className="rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                      onClick={() =>
                                        document
                                          .getElementById("hidden-input")
                                          .click()
                                      }
                                    >
                                      Upload a file
                                    </button>
                                  </header>
                                  <ul
                                    id="gallery"
                                    className="flex flex-1 flex-wrap -m-1"
                                  >
                                    {files.length === 0 ? (
                                      <li
                                        id="empty"
                                        className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                                      >
                                        <img
                                          className="mx-auto w-32"
                                          src={uploadImg}
                                          alt="no data"
                                        />
                                      </li>
                                    ) : (
                                      files.map((file, index) => (
                                        <li
                                          key={index}
                                          className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24 uploadedImgs"
                                        >
                                          <article
                                            tabIndex="0"
                                            className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer shadow-sm"
                                          >
                                            <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3 uploadImgDiv">
                                              <h1 className="flex-1 group-hover:text-blue-800">
                                                {file.name}
                                              </h1>
                                              <div className="flex">
                                                <p className="p-1 size text-xs text-gray-700">
                                                  {file.size} bytes
                                                </p>
                                                <button
                                                  className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800"
                                                  onClick={() =>
                                                    setFiles(
                                                      files.filter(
                                                        (_, i) => i !== index
                                                      )
                                                    )
                                                  }
                                                >
                                                  <svg
                                                    className="pointer-events-none fill-current w-4 h-4 ml-auto"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                  >
                                                    <path
                                                      className="pointer-events-none"
                                                      d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                                    />
                                                  </svg>
                                                </button>
                                              </div>
                                            </section>
                                          </article>
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                </section>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="ticketDetails">
                                <div className="eventFields">
                                  <div className="eventLables">
                                    <label className="fieldlabels">
                                      Ticket details
                                    </label>{" "}
                                    <input
                                      type="text"
                                      name="text"
                                      placeholder="Enter a descriptive name..."
                                      onChange={handleChange}
                                      id="ticketInput"
                                    />{" "}
                                  </div>
                                  <div className="eventLables status">
                                    <label className="fieldlabels">
                                      Status
                                    </label>{" "}
                                    <select
                                      className="form-select form-select-lg"
                                      aria-label=".form-select-lg example"
                                      id="ticketInput"
                                    >
                                      <option selected>Acitve</option>
                                      <option>Inactve</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="eventLables">
                                  <input
                                    type="text"
                                    name="text"
                                    placeholder="Describe what’s included"
                                    onChange={handleChange}
                                    id="ticketInput"
                                  />{" "}
                                  <div className="datetime">
                                    <div className="datePicker">
                                      <label className="fieldlabels">
                                        Start date
                                      </label>{" "}
                                      <input
                                        type="date"
                                        value={formData.cpwd}
                                        onChange={handleChange}
                                        id="ticketInput"
                                      />
                                      <label className="fieldlabels">
                                        End date
                                      </label>{" "}
                                      <input
                                        type="date"
                                        value={formData.cpwd}
                                        onChange={handleChange}
                                        id="ticketInput"
                                      />
                                    </div>
                                    <div className="chooseTime">
                                      <label className="fieldlabels">
                                        Start Time
                                      </label>{" "}
                                      <input
                                        type="time"
                                        value={formData.cpwd}
                                        onChange={handleChange}
                                        id="ticketInput"
                                      />
                                      <label className="fieldlabels">
                                        Start Time
                                      </label>{" "}
                                      <input
                                        type="time"
                                        value={formData.cpwd}
                                        onChange={handleChange}
                                        id="ticketInput"
                                      />
                                    </div>
                                  </div>
                                  <div className="onlineVenue">
                                    <div className="tabSection">
                                      <div id="tabs">
                                        <input
                                          type="radio"
                                          id="button-1"
                                          name="tab"
                                          defaultChecked
                                        />
                                        <input
                                          type="radio"
                                          id="button-2"
                                          name="tab"
                                        />
                                        <input
                                          type="radio"
                                          id="button-3"
                                          name="tab"
                                        />
                                        <input
                                          type="radio"
                                          id="button-4"
                                          name="tab"
                                        />
                                        <ul id="menu">
                                          <li className="tab-1-li">
                                            <label htmlFor="button-1">
                                              Paid
                                            </label>
                                          </li>
                                          <li className="tab-2-li">
                                            <label htmlFor="button-2">
                                              Free
                                            </label>
                                          </li>
                                          <li className="bg"></li>
                                        </ul>
                                        <div id="shadow">
                                          <div id="content">
                                            <div id="tab-1">
                                              <div className="left">
                                                <form
                                                  onSubmit={handleSubmit}
                                                  className="paidFree"
                                                >
                                                  <div className="eventLables">
                                                    <label className="fieldlabels">
                                                      Price
                                                    </label>{" "}
                                                    <input
                                                      type="text"
                                                      name="text"
                                                      placeholder="Leave blank if the location is to be announced..."
                                                      onChange={handleChange}
                                                    />{" "}
                                                  </div>
                                                  <div className="eventLables">
                                                    <label className="fieldlabels">
                                                      Quantity available
                                                    </label>{" "}
                                                    <input
                                                      type="Number"
                                                      name="text"
                                                      placeholder="66"
                                                      onChange={handleChange}
                                                    />{" "}
                                                  </div>
                                                  <div className="eventLables">
                                                    <label className="fieldlabels">
                                                      Max tickets per customer
                                                    </label>{" "}
                                                    <input
                                                      type="Number"
                                                      name="text"
                                                      placeholder="34"
                                                      onChange={handleChange}
                                                    />{" "}
                                                  </div>
                                                </form>
                                              </div>
                                              <div className="right"></div>
                                            </div>
                                            <div id="tab-2">
                                              <div className="left">
                                                <form onSubmit={handleSubmit}>
                                                  <div className="eventLables">
                                                    <label className="fieldlabels">
                                                      Event Location
                                                    </label>{" "}
                                                    <input
                                                      type="text"
                                                      name="text"
                                                      placeholder="4"
                                                      onChange={handleChange}
                                                    />{" "}
                                                  </div>
                                                  <div className="eventLables">
                                                    <textarea
                                                      name="description"
                                                      placeholder="Description"
                                                    ></textarea>
                                                  </div>
                                                </form>
                                              </div>
                                              <div className="right"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="absorbFees">
                                    <div className="toggleBtn">
                                      <label className="switch">
                                        <input type="checkbox" id="togBtn" />
                                        <div className="slider round"></div>
                                      </label>
                                      <p>Absorb Fee</p>
                                    </div>
                                    <h4>Total cost: £25.00</h4>
                                  </div>
                                  <div className="ticketBtns">
                                    <button className="loginButton">
                                      <span>Cancel</span>
                                    </button>
                                    <button
                                      className="loginButton"
                                      type="submit"
                                    >
                                      <span>Add ticket</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="multistep-button-wrap">
                          <button className="loginButton previous-create-event">
                            <span>Prev</span>
                          </button>
                          <button className="loginButton" type="submit">
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
