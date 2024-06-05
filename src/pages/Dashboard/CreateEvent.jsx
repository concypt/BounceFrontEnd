import { useState, useEffect } from "react";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";

// css
// import "./styles/primaryStyles.css";
// import "./styles/comonStyles.css";

// images
import uploadImg from "../../assets/images/upload.svg";
import dustbin from "../../assets/images/dustbin.svg";
import ticketArrows from "../../assets/images/topArrow.svg";
import pencil from "../../assets/images/pencil.svg";

function CreateEvent() {
  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <div className="content"></div>
    </div>
  );
}

export default CreateEvent;
