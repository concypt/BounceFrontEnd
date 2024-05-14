import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

//images
import viewImg from "../../assets/images/event-dash-icon-view.svg";
import ticketImg from "../../assets/images/event-dash-icon-ticket.svg";
import editImg from "../../assets/images/event-dash-icon-edit.svg";
import deleteImg from "../../assets/images/event-dash-icon-delete.svg";

function EventDashboard() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bounce.extrasol.co.uk/api/user/all-event",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTableData(data.data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define columns for React Table
  const columns = React.useMemo(
    () => [
      {
        Header: "Event Name",
        accessor: "name",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        className: "status-column",
        Cell: ({ value }) => (
          <div className={value === 1 ? "published" : "draft"}>
            {value === 1 ? "Published" : "Draft"}
          </div>
        ),
      },
      {
        Header: "Date",
        accessor: "start_time",
        Cell: ({ value }) => {
          // Convert the value to a JavaScript Date object
          const date = new Date(value);
          // Format the date to display only the date part
          const formattedDate = date.toISOString().split("T")[0];
          return <span>{formattedDate}</span>;
        },
      },
      {
        Header: "Tickets sold",
        accessor: "tickets",
        Cell: ({ row }) => {
          const { soldTickets, totalTickets } = row.original;
          const progress =
            totalTickets !== 0 ? (soldTickets / totalTickets) * 100 : 0;

          return (
            <div
              className={`progress-bar-container-ticket ${
                progress < 40 ? "half-tickets-sold" : ""
              }`}
            >
              <div
                className="progress-bar-ticket"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="progress-text">
                {soldTickets}/{totalTickets}
              </span>
            </div>
          );
        },
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
    { columns, data: tableData },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables">
        <div className="tablesGrid">
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
              <table {...getTableProps()} className="table your-events-table">
                <thead>
                  {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} key={column.id}>
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} key={cell.column.id}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                        <td className="actionsColumn">
                          {/* Actions */}
                          <button>
                            <img src={viewImg} alt="" />
                          </button>
                          <button className="mx-1">
                            <img src={ticketImg} alt="" />
                          </button>
                          <button className="me-1">
                            <img src={editImg} alt="" />
                          </button>
                          <button>
                            <img src={deleteImg} alt="" />
                          </button>
                        </td>
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
              <Link to={`/dashboard-create-event`}>
                <button className="loginButton" type="submit">
                  <span>Create new event</span>
                </button>
              </Link>
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
        <div className="secondTables">
          <div className="tablesGrid">
            <div className="tableOne">
              <div className="searchBar">
                <h2>Ticket Orders</h2>
              </div>
              <div className="table-container"></div>
            </div>
            <div className="secondActionsDiv">
              <div className="tableOne">
                <div className="searchBar">
                  <div className="payout">
                    <h2>Payout schedule</h2>
                    <img src="images/question.svg" alt="" />
                  </div>
                  <Link to={`/dashboard-single-event`} className="viewAll">
                    <span>View all</span>
                    <img src="images/right-arrow.svg" alt="" />
                  </Link>
                </div>
                <div className="table-container"></div>
                <p className="tableContent">
                  Not automatic, either manually paid out or simple workflow
                  needed to handle this. Based on when events happen, 7-14 days
                  after automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventDashboard;
