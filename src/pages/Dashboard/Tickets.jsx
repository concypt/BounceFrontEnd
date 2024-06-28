import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostSingleEventInfo from "../../components/Host/HostSingleEventInfo";
import HostSingleEventOrders from "../../components/Host/HostSingleEventOrders";
import ManageTickets from "../../components/Host/Marketing/ManageTickets";
import OrdersData from "../../components/Host/Marketing/OrdersData";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import { fetchEventTickets } from "../../api/musecureService";


function Tickets() {
  const { eventId } = useParams();
  const {
    data: eventTicketData,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchEventTickets(eventId),
    queryKey: ["TicketsInfo", eventId],
    enabled: !!eventId, 
  });

  if (isLoading && !eventTicketData)
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

  if(eventTicketData){
    const jsonData = JSON.stringify(eventTicketData);
    const  parsedData = JSON.parse(jsonData);
  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables">
        <div className="promotersMain">
          <div className="ticketOrders">
          <div className="searchBar">
            <ManageTickets ticketsData={parsedData} />
            </div>
            <div className="table-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Tickets;
