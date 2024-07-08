import { useState } from "react";
import { useQuery , useQueryClient  } from "@tanstack/react-query";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostCreateCampaigns from "../../components/Host/HostCreateCampaigns";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import "./HostEvent.css";
import { getSubscriberList } from "../../api/musecureService";

const HostCampaigns = () => {

  const {
    data: list,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getSubscriberList"],
    queryFn: getSubscriberList,
  });
  if (isLoading && !list)
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
      <Header />
      <Sidebar />
      <div className="content">
        <div className="tabs">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="progressCard">
                <div className="multiForm">
                  <div className="createEventTicket" id="msform">
                   <div className="fieldsetOne">
                   <HostCreateCampaigns list={list}/>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostCampaigns;
