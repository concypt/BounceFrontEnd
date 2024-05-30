import { useMemo, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import "./styles/primaryStyles.css";
import "./styles/comonStyles.css";
import Modal from "react-modal";

const URL = "/api/user/all-marketing-list";
let config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const fetchMarketingData = async () => {
  const { data } = await axios.get(URL, config).then((res) => res.data);
  return data;
};

function Marketing() {
  const {
    data: marketing,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["marketingFetchData"],
    queryFn: fetchMarketingData,
  });
  const [loadingComplete, setLoadingComplete] = useState(false);

  if (isLoading)
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
  if (error) return <p>Error: {error.message}</p>;
  if (!marketing) {
    return (
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 10 : 0}
      />
    );
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
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
        <div className="tablesGrid marketingGrid">
          <div className="ticketOrders">
            <div className="searchBar">
              <h2>Emails</h2>
              <button
                className="loginButton"
                type="submit"
                onClick={openModal}
                // disabled={isSubmitting} // Disable button when isSubmitting is true
              >
                {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
                <span>Create new campaign</span>
                {/* )} */}
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
              >
                <h2>Popup Content</h2>
                <p>This is the content of the popup.</p>
                <button onClick={closeModal}>Close</button>
              </Modal>
            </div>
            <div className="table-container">
              <table {...getTableProps()} className="dataTable">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.key}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={column.id} {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr key={row.id} {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td key={cell.column.id} {...cell.getCellProps()}>
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
          <div className="promotersMain marketingSubscriber">
            <div className="ticketOrders promotertable">
              <div className="searchBar">
                <h2>Subscriber Lists</h2>
                <button
                  className="loginButton"
                  type="submit"
                  // disabled={isSubmitting} // Disable button when isSubmitting is true
                >
                  {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
                  <span>Create new list</span>
                  {/* )} */}
                </button>
              </div>
              <div className="table-container">
                <table {...getTableProps()} className="dataTable">
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        {...headerGroup.getHeaderGroupProps()}
                      >
                        {headerGroup.headers.map((column) => (
                          <th key={column.id} {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={row.id} {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td key={cell.column.id} {...cell.getCellProps()}>
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
                <h2>Discount codes</h2>
                <button
                  className="loginButton"
                  type="submit"
                  // disabled={isSubmitting} // Disable button when isSubmitting is true
                >
                  {/* {isSubmitting ? (
                        "Submitting..."
                      ) : ( */}
                  <span>Create new code</span>
                  {/* )} */}
                </button>
              </div>
              <div className="table-container">
                <table {...getTableProps()} className="dataTable">
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        {...headerGroup.getHeaderGroupProps()}
                      >
                        {headerGroup.headers.map((column) => (
                          <th key={column.id} {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={row.id} {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td key={cell.column.id} {...cell.getCellProps()}>
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
    </div>
  );
}
export default Marketing;
