import { useParams } from "react-router-dom";
import { useQuery , useQueryClient} from "@tanstack/react-query";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostSingleEventInfo from "../../components/Host/HostSingleEventInfo";
import ManageSubscribeList from "../../components/Host/Marketing/ManageSubscribeList";
import OrdersData from "../../components/Host/Marketing/OrdersData";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import { fetchSubscribeList } from "../../api/musecureService";
function SubscribeList() {
  const queryClient = useQueryClient();
  const { subscribelist_Id } = useParams();
  const {
    data: subscribeListData,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchSubscribeList(subscribelist_Id),
    queryKey: ["fetchSubscribeList", subscribelist_Id],
    enabled: !!subscribelist_Id, 
  });
  const handleDeleteSubscribeList = async (id) => {
    try {
      await queryClient.invalidateQueries("fetchSubscribeList");
    } catch (error) {
      console.error("Error deleting subscribe list: ", error);
    }
  };

  if (isLoading && !subscribeListData)
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

  if(subscribeListData){
    const jsonData = JSON.stringify(subscribeListData);
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
            <ManageSubscribeList subscribelist_Id ={subscribelist_Id}subscribeListData={parsedData} onDeleteSubscribeList={handleDeleteSubscribeList} />
            </div>
            <div className="table-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default SubscribeList;
