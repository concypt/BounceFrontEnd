import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostSingleEventInfo from "../../components/Host/HostSingleEventInfo";
//import HostSingleEventOrders from "../../components/Host/HostSingleEventOrders";
import Refund from "../../components/Host/Marketing/RefundData";
import OrdersData from "../../components/Host/Marketing/OrdersData";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import { fetchSingleEventDetails } from "../../api/musecureService";
//import { fetchMarketingData } from "../../api/musecureService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EventSingle() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    data: eventSingleData,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchSingleEventDetails(eventId),
    queryKey: ["EventInfo", eventId],
    enabled: !!eventId,
  });

  useEffect(() => {
    // Check if data is undefined or doesn't have required properties
    if (eventSingleData && eventSingleData.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized Access",
        text: "You do not have permission to access event details page.",
        confirmButtonText: "Okay",
      }).then(() => {
        navigate(`/dashboard-event`);
      });
    }
  }, [eventSingleData, navigate]);
  console.log(eventSingleData);
  if (isLoading && !eventSingleData)
    return (
      <div className="dashboard">
        <div>
          <Header />
          <Sidebar />
        </div>
        <div className="dataTables">
          <div className="tablesGrid">
            <div className="ticketOrders">
              <Skeleton height="50vh" />
            </div>
            <div className="ticketOrders">
              <div className="upcomingDiv">
                <h2>
                  <Skeleton width={320} />
                </h2>
                <Skeleton width={250} height={40} borderRadius={20} />
              </div>
              <Skeleton height="50vh" />
            </div>
          </div>
          <div className="ticketOrders mt-4">
            <Skeleton width="100%" height="50vh" />
          </div>
        </div>
      </div>
    );
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (eventSingleData && eventSingleData.event) {
    const jsonData = JSON.stringify(eventSingleData);
    const parsedData = JSON.parse(jsonData);
    return (
      <div className="dashboard">
        <div>
          <Header />
          <Sidebar />
        </div>
        <div className="dataTables">
          <div className="tablesGrid">
            <HostSingleEventInfo eventData={parsedData.event} />
            <div className="ticketOrders">
              <div className="searchBar">
                <OrdersData
                  ordersData={parsedData.orders}
                  event={parsedData.event}
                  sold_tickets={parsedData.sold_tickets}
                  total_tickets={parsedData.total_tickets}
                  tickets={parsedData.availableTickets}
                />
              </div>
              <div className="table-container"></div>
            </div>
          </div>
          <div className="promotersMain">
            <div className="ticketOrders">
              <div className="searchBar">
                <Refund
                  refundData={parsedData.orders_refund}
                  eventname={parsedData.event.name}
                />
              </div>
              <div className="table-container"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventSingle;
