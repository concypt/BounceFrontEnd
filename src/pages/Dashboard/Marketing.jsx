import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "react-top-loading-bar";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import EmailList from "../../components/Host/Marketing/emailsList";
import DiscountCodes from "../../components/Host/Marketing/discountCodes";
import SubscribersList from "../../components/Host/Marketing/subscribersList";
import { fetchMarketingData } from "../../api/secureService";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

const Marketing = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const {
    data: marketing,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetchMarketingData"],
    queryFn: fetchMarketingData,
  });

  if (isLoading) {
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
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!marketing) {
    return (
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 10 : 0}
      />
    );
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
            <SubscribersList />
            <DiscountCodes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
