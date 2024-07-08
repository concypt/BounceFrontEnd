import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useQuery , useQueryClient  } from "@tanstack/react-query";
import axios from "axios";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import EmailList from "../../components/Host/Marketing/emailsList";
import DiscountCodes from "../../components/Host/Marketing/discountCodes";
import SubscribersList from "../../components/Host/Marketing/subscribersList";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import { fetchMarketingData } from "../../api/musecureService";
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
            <SubscribersList  subscribe_list = {marketing.subscribe_list} onDeleteCampaign={handleDeleteCampaign} />
            <DiscountCodes coupons={marketing.coupon} onDeleteCampaign={handleDeleteCampaign} events={marketing.events}/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Marketing;
