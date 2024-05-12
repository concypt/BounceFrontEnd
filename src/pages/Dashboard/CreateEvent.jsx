import React, { useState } from "react";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import uploadImg from "../../assets/images/upload.svg";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

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
                          <div className="col-7">
                            <h2 className="fs-title">New Event</h2>
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
              
                        <label className="fieldlabels">
                          Confirm Password: *
                        </label>{" "}
                        <input
                          type="password"
                          name="cpwd"
                          placeholder="Confirm Password"
                          value={formData.cpwd}
                          onChange={handleChange}
                        />
                      </div>{" "}
                      <button
                        type="button"
                        name="next"
                        className="next action-button"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </fieldset>
                    <fieldset>
                      <div className="form-card">
                        <div className="row">
                          <div className="col-7">
                            <h2 className="fs-title">Personal Information:</h2>
                          </div>
                        </div>{" "}
                        <label className="fieldlabels">First Name: *</label>{" "}
                        <input
                          type="text"
                          name="fname"
                          placeholder="First Name"
                          value={formData.fname}
                          onChange={handleChange}
                        />{" "}
                        <label className="fieldlabels">Last Name: *</label>{" "}
                        <input
                          type="text"
                          name="lname"
                          placeholder="Last Name"
                          value={formData.lname}
                          onChange={handleChange}
                        />{" "}
                        <label className="fieldlabels">Contact No.: *</label>{" "}
                        <input
                          type="text"
                          name="phno"
                          placeholder="Contact No."
                          value={formData.phno}
                          onChange={handleChange}
                        />{" "}
                        <label className="fieldlabels">
                          Alternate Contact No.: *
                        </label>{" "}
                        <input
                          type="text"
                          name="phno_2"
                          placeholder="Alternate Contact No."
                          value={formData.phno_2}
                          onChange={handleChange}
                        />
                      </div>{" "}
                      <button
                        type="button"
                        name="previous"
                        className="previous action-button-previous"
                        onClick={prevStep}
                      >
                        Previous
                      </button>{" "}
                      <button
                        type="button"
                        name="next"
                        className="next action-button"
                        onClick={nextStep}
                      >
                        Next
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
