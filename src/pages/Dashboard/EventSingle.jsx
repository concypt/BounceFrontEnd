import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostSingleEventInfo from "../../components/Host/HostSingleEventInfo";
import HostSingleEventOrders from "../../components/Host/HostSingleEventOrders";
import Refund from "../../components/Host/Marketing/RefundData";
import OrdersData from "../../components/Host/Marketing/OrdersData";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import { fetchSingleEventDetails } from "../../api/musecureService";

function EventSingle() {
  const { eventId } = useParams();

  const {
    data: eventSingleData,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchSingleEventDetails(eventId),
    queryKey: ["EventInfo", eventId],
    enabled: !!eventId,
  });

  if (isLoading && !eventSingleData)
    return (
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ textAlign: "center", width: "100%" }}>Loading...</p>
      </div>
    );
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (eventSingleData) {
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
