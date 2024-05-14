//import React, { useEffect, useState, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useTable, useFilters, useGlobalFilter } from "react-table"; // Import useFilters and useGlobalFilter
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function Attend() {
  // Sample data

  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables"></div>
    </div>
  );
}
export default Attend;
