import React, { useState } from "react";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import uploadImg from "../../assets/images/upload.svg";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

// images
import dustbin from "../../assets/images/dustbin.svg";
import ticketArrows from "../../assets/images/topArrow.svg";
import pencil from "../../assets/images/pencil.svg";

function CreateEvent() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    uname: "",
    pwd: "",
    cpwd: "",
    fname: "",
    lname: "",
    phno: "",
    phno_2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragLeave = (e) => e.preventDefault();
  const handleDragEnter = (e) => e.preventDefault();

  const handleFileInputChange = (e) => handleFiles(e.target.files);

  const handleFiles = (fileList) => {
    console.log(fileList);
    setFiles([...files, ...fileList]);
  };

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
                  <form id="msform" onSubmit={handleSubmit}>
                    <ul id="progressbar">
                      <li className={step === 1 ? "active" : ""} id="account">
                        <strong>Step 1</strong>
                        <h3>Event details</h3>
                      </li>
                      <li className={step === 2 ? "active" : ""} id="personal">
                        <strong>Step 2</strong>
                        <h3>Tickets</h3>
                      </li>
                    </ul>
                    <fieldset>
                      <div className="form-card">
                        <div className="row">
                          <h2 className="fs-title">New Event</h2>
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
                        <div className="datetime">
                          <div className="datePicker">
                            <label className="fieldlabels">Start date</label>{" "}
                            <input
                              type="date"
                              value={formData.cpwd}
                              onChange={handleChange}
                            />
                            <label className="fieldlabels">End date</label>{" "}
                            <input
                              type="date"
                              value={formData.cpwd}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="chooseTime">
                            <label className="fieldlabels">Start Time</label>{" "}
                            <input
                              type="time"
                              value={formData.cpwd}
                              onChange={handleChange}
                            />
                            <label className="fieldlabels">Start Time</label>{" "}
                            <input
                              type="time"
                              value={formData.cpwd}
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
                                          name="text"
                                          placeholder="Leave blank if the location is to be announced..."
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
                                          placeholder="Leave blank if the location is to be announced..."
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
                      <input
                        type="submit"
                        name="next"
                        class="next action-button"
                        value="Next"
                      />
                    </fieldset>
                    <fieldset className="fieldsetTwo">
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
                                  <label className="fieldlabels">Status</label>{" "}
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
                                          <label htmlFor="button-1">Paid</label>
                                        </li>
                                        <li className="tab-2-li">
                                          <label htmlFor="button-2">Free</label>
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
                                    <label class="switch">
                                      <input type="checkbox" id="togBtn" />
                                      <div class="slider round"></div>
                                    </label>
                                    <p>Absorb Fee</p>
                                  </div>
                                  <h4>Total cost: £25.00</h4>
                                </div>
                                <div className="ticketBtns">
                                  <button
                                    className="loginButton"
                                    type="submit"
                                    // onClick={prevStep}
                                  >
                                    <span>Cancel</span>
                                    {/* )} */}
                                  </button>
                                  <button
                                    className="loginButton"
                                    type="submit"
                                    // onClick={prevStep}
                                  >
                                    <span>Add ticket</span>
                                    {/* )} */}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                      <button
                        className="loginButton"
                        type="submit"
                        // onClick={prevStep}
                      >
                        <span>Save Event</span>
                        {/* )} */}
                      </button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
