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
