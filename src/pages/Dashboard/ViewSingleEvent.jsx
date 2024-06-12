import { useParams } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostSingleEventInfo from "../../components/Host/HostSingleEventInfo";
import HostSingleEventOrders from "../../components/Host/HostSingleEventOrders";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function EventSingle() {
  const { eventId } = useParams();
  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables">
        <div className="tablesGrid">
          <HostSingleEventInfo eventId={eventId} />
          <div className="ticketOrders">
            <div className="searchBar">
              <h2>Tickets Orders</h2>
              <button className="loginButton" type="submit">
                <span>Send tickets</span>
              </button>
              <h2>119/200 Available</h2>
            </div>
            <div className="table-container">
              <HostSingleEventOrders eventId={eventId} />
            </div>
          </div>
        </div>
        <div className="promotersMain">
          <div className="ticketOrders promotertable">
            <div className="searchBar">
              <h2>Promoters</h2>
            </div>
            <div className="table-container"></div>
          </div>
          <div className="ticketOrders">
            <div className="searchBar">
              <h2>Refunds</h2>
            </div>
            <div className="table-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventSingle;
