import { useState } from "react";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostCreateEvent from "../../components/Host/HostCreateEvent";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import "./CreateEvent.css";
import HostCreateTickets from "../../components/Host/HostCreateTickets";

const CreateEvent = () => {
  const [formStep, setFormStep] = useState(1);
  const [eventId, setEventId] = useState(null);

  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <div className="content">
        <div className="tabs">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="progressCard">
                <div className="multiForm">
                  <div className="createEventTicket" id="msform">
                    <ul className={`progressBar stepNo-${formStep}`}>
                      <li className={formStep === 1 ? "purple" : "green"}>
                        <div className="circle"></div>
                        <h4>Step 1</h4>
                        <h3>Event details</h3>
                        <p>{formStep === 1 ? "In Progress" : "Completed"}</p>
                      </li>

                      <li className={formStep === 1 ? "grey" : "purple"}>
                        <div className="circle"></div>
                        <h4>Step 2</h4>
                        <h3>Tickets</h3>
                        <p>{formStep === 2 ? "In Progress" : "Pending"}</p>
                      </li>
                      <div className="line"></div>
                    </ul>
<<<<<<< HEAD
                    <fieldset>
                      <div className="form-card">
                        <div className="row">
                          <div className="create-event-form-header">
                            <h2 className="fs-title">New Event</h2>
                            <div className="eventLables status">
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
                          <div className="mainUpload">
                            <main className="mx-auto max-w-screen-lg h-full">
                              <article
                                aria-label="File Upload Modal"
                                className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDragEnter={handleDragEnter}
                              >
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
                                      className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
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
                                        <span className="text-gray-500">
                                          Upload event images/photos
                                          <p>
                                            (recommended size 1080px wide and
                                            600px tall)
                                          </p>
                                        </span>
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
                              </article>
                            </main>
                          </div>
                        </div>{" "}
                        <div className="eventFields">
                          <div className="eventLables">
                            <label className="fieldlabels">Event Name</label>{" "}
                            <input
                              type="text"
                              name="text"
                              placeholder="Name"
                              value={formData.event_name}
                              onChange={handleChange}
                            />{" "}
                          </div>
                          <div className="eventLables">
                            <label className="fieldlabels">
                              Event Category
                            </label>{" "}
                            <select
                              className="form-select form-select-lg"
                              aria-label=".form-select-lg example"
                            >
                              <option selected>Event Category</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="eventLables">
                          <label className="fieldlabels">Tags</label>{" "}
                          {/* {formData.tags.map((tag, index) => (
                            <input
                              key={index}
                              type="text"
                              value={tag}
                              onChange={(e) =>
                                handleArrayChange(e, index, "tags")
                              }
                            />
                          ))} */}
                          {/* <select
                            className="form-select form-select-lg"
                            aria-label=".form-select-lg example"
                          >
                            <option selected>Event Category</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select> */}
                        </div>
                        <div className="datetime">
                          <div className="datePicker">
                            <label className="fieldlabels">Start date</label>{" "}
                            <input
                              type="date"
                              name="event_start_date"
                              value={formData.event_start_date}
                              onChange={handleChange}
                            />
                            <label className="fieldlabels">End date</label>{" "}
                            <input
                              type="date"
                              name="event_end_date"
                              value={formData.event_end_date}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="chooseTime">
                            <label className="fieldlabels">Start Time</label>{" "}
                            <input
                              type="time"
                              name="event_start_time"
                              value={formData.event_start_time}
                              onChange={handleChange}
                            />
                            <label className="fieldlabels">End Time</label>{" "}
                            <input
                              type="time"
                              name="event_end_time"
                              value={formData.event_end_time}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>{" "}
                      <div className="onlineVenue">
                        <div className="tabSection">
                          <div id="tabs">
                            <input
                              type="radio"
                              id="button-1"
                              name="tab"
                              defaultChecked
                            />
                            <input type="radio" id="button-2" name="tab" />
                            <input type="radio" id="button-3" name="tab" />
                            <input type="radio" id="button-4" name="tab" />
                            <ul id="menu">
                              <li className="tab-1-li">
                                <label htmlFor="button-1">Venue</label>
                              </li>
                              <li className="tab-2-li">
                                <label htmlFor="button-2">Online</label>
                              </li>
                              <li className="bg"></li>
                            </ul>
                            <div id="shadow">
                              <div id="content">
                                <div id="tab-1">
                                  <div className="left">
                                    <form onSubmit={handleSubmit}>
                                      <div className="eventLables">
                                        <label className="fieldlabels">
                                          Event Location
                                        </label>{" "}
                                        <input
                                          type="text"
                                          name="address"
                                          placeholder="Leave blank if the location is to be announced..."
                                          value={formData.address}
                                          onChange={handleChange}
                                        />{" "}
                                      </div>
                                      <div className="eventLables">
                                        <textarea
                                          name="description"
                                          placeholder="Description"
                                          value={formData.event_description}
                                          onChange={handleChange}
                                        ></textarea>
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
                                          Event Link
                                        </label>{" "}
                                        <input
                                          type="text"
                                          name="link"
                                          placeholder="Leave blank if the meeting link is to be announced..."
                                          value={formData.link}
                                          onChange={handleChange}
                                        />{" "}
                                      </div>
                                      <div className="eventLables">
                                        <textarea
                                          name="description"
                                          placeholder="Description"
                                          value={formData.event_description}
                                          onChange={handleChange}
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
                      <input
                        type="submit"
                        name="next"
                        className="next-create-event action-button"
                        value="Next"
=======
                    <div
                      className="fieldsetOne"
                      style={
                        formStep === 1
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <HostCreateEvent
                        setFormStep={setFormStep}
                        setEventId={setEventId}
>>>>>>> live
                      />
                    </div>
                    <div
                      className="fieldsetTwo"
                      style={
                        formStep === 2
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <HostCreateTickets
                        eventId={eventId}
                        setFormStep={setFormStep}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
