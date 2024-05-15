import { Link } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostEvents from "../../components/Host/HostEvents";
import HostIicketOrders from "../../components/Host/HostTicketOrders";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function EventDashboard() {
  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables">
        <div className="tablesGrid">
          <HostEvents />
          <div className="secondActionsDiv">
            <div className="actionDiv">
              <h2>Ready to bounce into action?</h2>
              <Link to={`/dashboard-create-event`}>
                <button className="loginButton" type="submit">
                  <span>Create new event</span>
                </button>
              </Link>
            </div>
            <div className="earningsDiv">
              <h2>Earnings</h2>
              <div className="earningMain">
                <div className="earnings">
                  <p>Current Balance</p>
                  <h3>£78.00</h3>
                </div>
                <div className="earnings">
                  <p>Total All Time</p>
                  <h3>£123.60</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="secondTables">
          <div className="tablesGrid">
            <HostIicketOrders />
            <div className="secondActionsDiv">
              <div className="tableOne">
                <div className="searchBar">
                  <div className="payout">
                    <h2>Payout schedule</h2>
                    <img src="images/question.svg" alt="" />
                  </div>
                  <Link to={`/dashboard-single-event`} className="viewAll">
                    <span>View all</span>
                    <img src="images/right-arrow.svg" alt="" />
                  </Link>
                </div>
                <div className="table-container"></div>
                <p className="tableContent">
                  Not automatic, either manually paid out or simple workflow
                  needed to handle this. Based on when events happen, 7-14 days
                  after automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventDashboard;
