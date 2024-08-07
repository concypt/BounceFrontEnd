import { useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostCreateTickets from "../../components/Host/HostCreateTickets";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import "./HostEvent.css";

const HostEvent = () => {
  const { id } = useParams();

  //console.log(id);

  const [formStep, setFormStep] = useState(2);
  const [eventId] = useState(id ? parseInt(id) : null);

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

export default HostEvent;
