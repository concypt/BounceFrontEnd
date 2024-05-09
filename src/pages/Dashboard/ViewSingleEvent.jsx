import { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";

function EventSingle() {
  // Sample data
  const data = useMemo(
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
  const columns = useMemo(
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
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Initial page index
    },
    usePagination // Use pagination hook
  );

  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="dataTables">
        <div className="tablesGrid">
          <div className="singleEvent">
            <div className="singleEventHeader">
              <h2>Miami Part 2</h2>
              <a href="#" className="viewAll">
                <span>View event page </span>
              </a>
            </div>
            <div className="cardDescription">
              <p className="event_date">
                <img
                  src="/images/calender.svg"
                  className="descriptionImg"
                  alt=""
                />{" "}
                Saturday 23rd March 2024
              </p>
              <p>
                {" "}
                <img
                  src="/images/clock_grey.svg"
                  className="descriptionImg"
                  alt=""
                />{" "}
                5.00 PM
              </p>
              <p>
                {" "}
                <img
                  src="/images/location_grey.svg"
                  className="descriptionImg"
                  alt=""
                />{" "}
                7 Scott Street, London EN12 9GN
              </p>
            </div>
            <div className="singleEventBtn">
              <button
                className="loginButton"
                type="submit"
                // disabled={isSubmitting} // Disable button when isSubmitting is true
              >
                {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
                <span>Edit event</span>
                {/* )} */}
              </button>
              <button
                className="loginButton"
                type="submit"
                // disabled={isSubmitting} // Disable button when isSubmitting is true
              >
                {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
                <span>Manage tickets</span>
                {/* )} */}
              </button>
            </div>
          </div>
          <div className="ticketOrders">
            <div className="searchBar">
              <h2>Tickets Orders</h2>
              <button
                className="loginButton"
                type="submit"
                // disabled={isSubmitting} // Disable button when isSubmitting is true
              >
                {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
                <span>Send tickets</span>
                {/* )} */}
              </button>
              <h2>119/200 Available</h2>
            </div>
            <div className="table-container">
              <table {...getTableProps()} className="dataTable">
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
                  {page.map((row, i) => {
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

              {/* Pagination */}
              <div className="pagination">
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>{" "}
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {page.length}
                  </strong>{" "}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="promotersMain">
          <div className="ticketOrders promotertable">
            <div className="searchBar">
              <h2>Promoters</h2>
            </div>
            <div className="table-container">
              <table {...getTableProps()} className="dataTable">
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
                  {page.map((row, i) => {
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
              {/* Pagination */}
              <div className="pagination">
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>{" "}
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {page.length}
                  </strong>{" "}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </button>{" "}
              </div>
            </div>
          </div>
          <div className="ticketOrders">
            <div className="searchBar">
              <h2>Refunds</h2>
            </div>
            <div className="table-container">
              <table {...getTableProps()} className="dataTable">
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
                  {page.map((row, i) => {
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

              {/* Pagination */}
              <div className="pagination">
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>{" "}
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {page.length}
                  </strong>{" "}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventSingle;
