import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useTable, useFilters, useGlobalFilter } from "react-table"; // Import useFilters and useGlobalFilter
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function EventDashboard() {
  // Sample data
  const data = React.useMemo(
    () => [
      {
        id: 1,
        eventName: "Event 1",
        date: "2024-05-06",
        location: "Location 1",
      },
      {
        id: 2,
        eventName: "Event 2",
        date: "2024-05-07",
        location: "Location 2",
      },
      // Add more data as needed
    ],
    []
  );

  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Event Name",
        accessor: "eventName",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Location",
        accessor: "location",
      },
    ],
    []
  );

  // Use the useTable hook to create the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useFilters, // useFilters hook
    useGlobalFilter // useGlobalFilter hook
  );

  const { globalFilter } = state;

  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables">
        <div className="tableOne">
          <div className="searchBar">
            <h2>Your Events</h2>
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search your events"
            />
          </div>
          <div className="table-container">
            <table {...getTableProps()} className="table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="secondActionsDiv">
          <div className="actionDiv">
            <h2>Ready to bounce into action?</h2>
            <button
              className="loginButton"
              type="submit"
              // disabled={isSubmitting} // Disable button when isSubmitting is true
            >
              {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
              <span>Create new event</span>
              {/* )} */}
            </button>
          </div>
          <div className="earningsDiv">
            <h2>Earnings</h2>
            <div className="earningMain">
              <div className="earnings">
                <p>Current Balance</p>
                <h3>£78.00</h3>
              </div>
              <div className="earnings">
                <p>Total All Time</p>
                <h3>£123.60</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventDashboard;
