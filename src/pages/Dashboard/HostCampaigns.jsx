import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import HostCreateCampaigns from "../../components/Host/HostCreateCampaigns";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import "./HostEvent.css";
import { getSubscriberList } from "../../api/musecureService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
                        <Skeleton height="776px" />
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
                      <HostCreateCampaigns list={list} />
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
