import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import EmailList from "../../components/Host/Marketing/emailsList";
import DiscountCodes from "../../components/Host/Marketing/discountCodes";
import SubscribersList from "../../components/Host/Marketing/subscribersList";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function Marketing() {
  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables">
        <div className="tablesGrid marketingGrid">
          <div className="ticketOrders">
            <div className="searchBar">
              <h2>Emails</h2>
              <button className="loginButton" type="submit">
                <span>Create new campaign</span>
              </button>
            </div>
            <div className="table-container">
              <EmailList />
            </div>
          </div>
          <div className="promotersMain marketingSubscriber">
            <div className="ticketOrders promotertable">
              <div className="searchBar">
                <h2>Subscriber Lists</h2>
                <button className="loginButton" type="submit">
                  <span>Create new list</span>
                </button>
              </div>
              <div className="table-container">
                <SubscribersList />
              </div>
            </div>
            <div className="ticketOrders">
              <div className="searchBar">
                <h2>Discount codes</h2>
                <button className="loginButton" type="submit">
                  <span>Create new code</span>
                </button>
              </div>
              <div className="table-container">
                <DiscountCodes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Marketing;
