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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEvents, deleteEvent } from "../../api/secureService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const queryClient = useQueryClient();
  const [tableData, setTableData] = useState([]);
  const {
    data: apiResponse = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    keepPreviousData: true,
  });

  useEffect(() => {
    // Ensure apiResponse is not empty before setting tableData
    if (apiResponse && apiResponse.length > 0) {
      setTableData(apiResponse);
    }
  }, [apiResponse]);

  const mutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      Swal.fire("Deleted!", "Your event has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete event.", "error");
    },
  });

  const handleView = (id) => {
    navigate(`/dashboard-single-event/${id}`);
  };

  const handleDelete = (id) => {
    console.log("handleDelete called with id:", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7357FF",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
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
           console.log(totalTickets)
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
            <button
              className="mx-1"
              onClick={() =>
                navigate(`/host-event/${row.original.id}/tickets/`)
              }
            >
              <img src={ticketImg} alt="Ticket" />
            </button>
            <button
              className="me-1"
              onClick={() => navigate(`/host-event/edit/${row.original.id}/`)}
            >
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

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    console.log(error);
  }

  return (
    <div className="tableOne events-main-table">
      <div className="searchBar">
        <h2>{"Your Events" || <Skeleton />}</h2>
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search your events"
        />
      </div>
      {isLoading ? (
        <div className="table-container">
          <Skeleton count={5} height={70} />
        </div>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
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
      )}
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
