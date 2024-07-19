import { useState, useMemo, useEffect } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../../../pages/Dashboard/styles/primaryStyles.css";
import "../../../pages/Dashboard/styles/comonStyles.css";
import { requestRefundAction } from "../../../api/musecureService";

// images
import decline from "../../../assets/images/close-icon.svg";
import paginatePrev from "../../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../../assets/images/pagination-arrow-next.svg";
import approve from "../../../assets/images/accept-icon.svg";

const HostTicketOrders = ({ refundData, eventname }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: requestRefundAction,
    mutationKey: ["applrequestRefundActionyHost"],
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Congrats! You are now a submit.",
        timer: 2000,
      }).then(() => {
        navigate("/dashboard");
      });
    },
    onError: (error) => {
      console.error("Error submitting host application:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue submitting your application. Please try again.",
      });
    },
  });

  const handleRefund = (id, order_id, status) => {
    if (status === 2) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7357FF",
        confirmButtonText: "Yes!",
        input: "text", // Add input field for description
        inputPlaceholder: "Enter Description",
      }).then((result) => {
        if (result.isConfirmed) {
          const description = result.value || ""; // Get the description from the input
          const formData = {
            refund_id: id,
            status: status,
            order_id: order_id,
            description: description, // Include description in formData
          };
          // Now you can send formData with description included
          mutation.mutate(formData);
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7357FF",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = {
            refund_id: id,
            status: status,
            order_id: order_id,
          };
          mutation.mutate(formData);
        }
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        Header: "Order#",
        accessor: "order_id",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Customer Name",
        accessor: (row) =>
          `${row.customer.first_name} ${row.customer.last_name}`,
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Events",
        Cell: () => <div>{eventname}</div>,
      },
      {
        Header: "Payment",
        accessor: "payment",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>
            {value.length > 20 ? "£" + value.slice(0, 20) + "..." : "£" + value}
          </div>
        ),
      },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="actionsColumn">
            <button
              onClick={() =>
                handleRefund(row.original.refund_details.id, row.original.id, 1)
              }
            >
              <img src={approve} alt="View" />
            </button>
            <button
              onClick={() =>
                handleRefund(row.original.refund_details.id, row.original.id, 2)
              }
            >
              <img src={decline} alt="View" />
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
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data: refundData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <div className="ticketOrders">
      <div className="searchBar">
        <h2>Refunds</h2>
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
        <div className="pagination">
          <div className="pagination-btns">
            <button
              className="control-btn"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              aria-label="Previous page"
            >
              <img src={paginatePrev} alt="Previous" />
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
              aria-label="Next page"
            >
              <img src={paginateNext} alt="Next" />
            </button>
          </div>
          <div className="item-show-per-page">
            <span>Results per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

HostTicketOrders.propTypes = {
  value: PropTypes.number,
  row: PropTypes.number,
};

export default HostTicketOrders;
