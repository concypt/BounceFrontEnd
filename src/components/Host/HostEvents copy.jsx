import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "../../pages/Dashboard/styles/primaryStyles.css";
import "../../pages/Dashboard/styles/comonStyles.css";

//images
import viewImg from "../../assets/images/event-dash-icon-view.svg";
import ticketImg from "../../assets/images/event-dash-icon-ticket.svg";
import editImg from "../../assets/images/event-dash-icon-edit.svg";
import deleteImg from "../../assets/images/event-dash-icon-delete.svg";
import paginatePrev from "../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../assets/images/pagination-arrow-next.svg";

const HostEvents = () => {
  const navigate = useNavigate();
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

  const handleView = (id) => {
    navigate(`/dashboard-single-event/${id}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7357FF",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://bounce.extrasol.co.uk/api/user/event-delete/${id}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete event");
          }

          setTableData((prevData) =>
            prevData.filter((event) => event.id !== id)
          );
          Swal.fire("Deleted!", "Your event has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting event:", error);
          Swal.fire("Error!", "Failed to delete event.", "error");
        }
      }
    });
  };

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
            {value === 1 ? <p>Published</p> : <p>Draft</p>}
          </div>
        ),
      },
      {
        Header: "Date",
        accessor: "start_time",
        Cell: ({ value }) => {
          const date = new Date(value);
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
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="actionsColumn">
            <button onClick={() => handleView(row.original.id)}>
              <img src={viewImg} alt="View" />
            </button>
            <button className="mx-1">
              <img src={ticketImg} alt="Ticket" />
            </button>
            <button className="me-1">
              <img src={editImg} alt="Edit" />
            </button>
            <button onClick={() => handleDelete(row.original.id)}>
              <img src={deleteImg} alt="Delete" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    setGlobalFilter,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    { columns, data: tableData, initialState: { pageIndex: 0, pageSize: 5 } },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <div className="pagination-btns">
          <button
            className="control-btn"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <img src={paginatePrev} alt="" />
          </button>
          {[...Array(pageCount)].map((_, index) => (
            <button
              key={index}
              onClick={() => gotoPage(index)}
              className={pageIndex === index ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="control-btn"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <img src={paginateNext} alt="" />
          </button>
        </div>
        <div className="item-show-per-page">
          <span>Results per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

HostEvents.propTypes = {
  value: PropTypes.number,
  row: PropTypes.number,
};

export default HostEvents;
