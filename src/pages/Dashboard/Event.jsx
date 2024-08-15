import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostEvents from "../../components/Host/HostEvents";
import HostIicketOrders from "../../components/Host/HostTicketOrders";
import { fetchEarningsData } from "../../api/masabService";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EventDashboard() {
  // Set loading complete to true when the page has finished loading
  const {
    data: earnings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["earningsDataFetch"],
    queryFn: fetchEarningsData,
  });

  if (isLoading) {
    return (
      <div className="dashboard">
        <Header />
        <Sidebar />
        <div className="dataTables">
          <div className="tablesGrid">
            <div className="tableOne events-main-table">
              <Skeleton height={608} width="100%" />
            </div>
            <div className="secondActionsDiv">
              <div className="actionDiv">
                <Skeleton height={40} width={200} />
                <Skeleton height={50} width={150} />
              </div>
              <div className="earningsDiv">
                <h2>
                  <Skeleton width={100} />
                </h2>
                <div className="earningMain">
                  <div className="earnings">
                    <p>
                      <Skeleton width={80} />
                    </p>
                    <h3>
                      <Skeleton width={100} />
                    </h3>
                  </div>
                  <div className="earnings">
                    <p>
                      <Skeleton width={80} />
                    </p>
                    <h3>
                      <Skeleton width={100} />
                    </h3>
                  </div>
                  <div className="earnings">
                    <p>
                      <Skeleton width={80} />
                    </p>
                    <h3>
                      <Skeleton width={100} />
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="secondTables oneColumnTable">
            <Skeleton height={400} width="calc(60% - 38px)" borderRadius={32} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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
              <Link to={`/host-event/new`}>
                <button title="Create Event" className="loginButton" type="submit">
                  <span>Create new event</span>
                </button>
              </Link>
            </div>
            <div className="earningsDiv">
              <h2>Earnings</h2>
              <div className="earningMain">
              <div className="earnings">
                  <p>Gross Sales</p>
                  <h3>£{earnings.gross_sales}</h3>
                </div>
                <div className="earnings">
                  <p>Net Sales</p>
                  <h3>£{earnings.net_sales}</h3>
                </div>
                <div className="earnings">
                  <p>Bounce fees</p>
                  <h3>£{(parseFloat(earnings.bounce_fees) || 0).toFixed(2)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="secondTables oneColumnTable">
          <div className="tablesGrid">
            <HostIicketOrders />
            {/* <div className="secondActionsDiv">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventDashboard;
