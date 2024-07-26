import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import EmailList from "../../components/Host/Marketing/emailsList";
import DiscountCodes from "../../components/Host/Marketing/discountCodes";
import SubscribersList from "../../components/Host/Marketing/subscribersList";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import { fetchMarketingData } from "../../api/musecureService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Marketing() {
  const queryClient = useQueryClient();
  const {
    data: marketing,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetchMarketingData"],
    queryFn: fetchMarketingData,
  });
  const handleDeleteCampaign = async (id) => {
    try {
      await queryClient.invalidateQueries("fetchMarketingData");
    } catch (error) {
      console.error("Error deleting campaign: ", error);
    }
  };

  if (isLoading && !marketing)
    return (
      <div className="dashboard">
        <div>
          <Header />
          <Sidebar />
        </div>
        <div className="dataTables">
          <div className="tablesGrid marketingGrid">
            <div className="ticketOrders compaign-list">
              <div className="upcomingDiv skeleton">
                <h2>
                  <Skeleton width={320} />
                </h2>
                <Skeleton width={250} height={40} borderRadius={20} />
              </div>
              <Skeleton height="100vh" />
            </div>
            <div className="promotersMain marketingSubscriber">
              <div className="ticketOrders promotertable">
                <div className="upcomingDiv skeleton">
                  <h2>
                    <Skeleton width={320} />
                  </h2>
                  <Skeleton width={250} height={40} borderRadius={20} />
                </div>
                <Skeleton height="50vh" />
              </div>
              <div className="ticketOrders">
                <div className="upcomingDiv skeleton">
                  <h2>
                    <Skeleton width={320} />
                  </h2>
                  <Skeleton width={250} height={40} borderRadius={20} />
                </div>
                <Skeleton height="50vh" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
        <div className="tablesGrid marketingGrid">
          <EmailList campaigns={marketing.campaigns} />
          <div className="promotersMain marketingSubscriber">
            <SubscribersList
              subscribe_list={marketing.subscribe_list}
              onDeleteCampaign={handleDeleteCampaign}
            />
            <DiscountCodes
              coupons={marketing.coupon}
              onDeleteCampaign={handleDeleteCampaign}
              events={marketing.events}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Marketing;
