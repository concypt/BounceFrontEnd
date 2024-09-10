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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "../../../pages/Dashboard/styles/primaryStyles.css";
import "../../../pages/Dashboard/styles/comonStyles.css";
import {
  fetchCoupons,
  addCoupon,
  deleteCoupon,
} from "../../../api/secureService";

// Styles for Modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "32px",
    maxWidth: "650px",
    width: "95%",
  },
};

Modal.setAppElement("#root");
// images
import deleteImg from "../../../assets/images/event-dash-icon-delete.svg";
import paginatePrev from "../../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../../assets/images/pagination-arrow-next.svg";

const HostTicketOrders = ({ coupons, onDeleteCampaign, events }) => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    coupon_code: "",
    event_id: [],
  });

  const mutation = useMutation({
    mutationFn: addCoupon,
    mutationKey: ["addCoupon"],
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Coupon added successfully!",
        timer: 2000,
      });
      setFormData({
        name: "",
        discount: "",
        coupon_code: "",
        event_id: [],
      });
      queryClient.invalidateQueries("coupons");
      setModalIsOpen(false);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error submitting form: ${error.message}`,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCoupon,
    mutationKey: ["deleteCoupon"],
    onSuccess: () => {
      queryClient.invalidateQueries("coupons");
      Swal.fire("Deleted!", "Your coupon has been deleted.", "success");
    },
    onError: (error) => {
      Swal.fire("Error!", "Failed to delete coupon.", error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEventIdChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({
      ...formData,
      event_id: selectedOptions,
    });
  };
  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedEventIds = [...formData.event_id]; // Make a copy of the current event_ids array

    if (checked) {
      updatedEventIds.push(value); // Add the value to the array if checkbox is checked
    } else {
      updatedEventIds = updatedEventIds.filter((id) => id !== value); // Remove the value if checkbox is unchecked
    }

    setFormData({
      ...formData,
      event_id: updatedEventIds, // Update the event_ids array in the formData state
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7357FF",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        onDeleteCampaign(id); // Inform parent component about delete action
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        Header: "Name",
        accessor: "name",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Coupon Code",
        accessor: "coupon_code",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Discount",
        accessor: "discount",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>
            {value ? `${value}%` : ''}
          </div>
        ),
      },
      {
        Header: "Events",
        accessor: "events",
        sortType: "basic",
        Cell: ({ row }) => (
          <div>
            {row.original.events
              ? row.original.events.slice(0, 3).map((event) => (
                  <span key={event.id}>
                    {event.name.length > 15
                      ? event.name.slice(0, 15) + "..."
                      : event.name}
                    {row.original.events.indexOf(event) < 2 && ", "}
                  </span>
                ))
              : ""}
            {row.original.events && row.original.events.length > 3 ? "..." : ""}
          </div>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="actionsColumn">
            <button title="Delete Discount Code" onClick={() => handleDelete(row.original.id)}>
              <img src={deleteImg} alt="View" />
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
      data: coupons,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  const generatePageNumbers = () => {
    const totalVisiblePages = 3;
    const pages = [];

    if (pageCount <= totalVisiblePages) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(
        0,
        pageIndex - Math.floor(totalVisiblePages / 2)
      );
      let endPage = Math.min(
        pageCount - 1,
        pageIndex + Math.floor(totalVisiblePages / 2)
      );

      if (pageIndex <= 2) {
        endPage = totalVisiblePages - 1;
      } else if (pageIndex >= pageCount - 3) {
        startPage = pageCount - totalVisiblePages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 0) {
        pages.unshift("...");
        if (startPage > 1) {
          pages.unshift(0);
        }
      }

      if (endPage < pageCount - 1) {
        if (endPage < pageCount - 2) {
          pages.push("...");
        }
        pages.push(pageCount - 1);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="ticketOrders">
      <div className="searchBar">
        <h2>Discount Codes</h2>
        <button className="loginButton" onClick={openModal} type="submit">
          <span>Create new code</span>
        </button>
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

            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="ellipsis">
                  {page}
                </span>
              ) : (
                <button
                  key={`page-${page}-${index}`} // <- Combine page number with index to ensure uniqueness
                  onClick={() => gotoPage(page)}
                  className={pageIndex === page ? "active" : ""}
                >
                  {page + 1}
                </button>
              )
            )}

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
              aria-label="Results per page"
            >
              {[5, 10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Upload Excel File"
        >
          <form onSubmit={handleSubmit}>
            <div className="discount-grid-popup">
              <div className="discount-grid-column">
                <h2>Create a discount code</h2>
                <div className="label-with-button">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="popupInput"
                  />
                </div>
                <div className="label-with-button">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    name="coupon_code"
                    required
                    value={formData.coupon_code}
                    onChange={handleInputChange}
                    className="popupInput"
                  />
                </div>
                <div className="label-with-button">
                  <div className="input-with-suffix">
                    <input
                      type="number"
                      placeholder="Discount"
                      name="discount"
                      required
                      value={formData.discount}
                      onChange={handleInputChange}
                      className="popupInput"
                    />
                    <span className="suffix">%</span>
                  </div>
                </div>
              </div>
              <div className="label-with-button">
                <label htmlFor="" className="multiple-events-discount-label">
                  Applies to
                </label>
                <div
                  className="popupInputTextarea"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {/* Dynamically render checkboxes */}
                  {events.map((event) => (
                    <div
                      key={event.id}
                      style={{
                        marginBottom: "15px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        id={`event_${event.id}`}
                        name={`event_id`}
                        value={event.id}
                        required
                        className="myCustomMultiSelectCheckboxes"
                        onChange={handleCheckboxChange}
                        style={{ marginRight: "13px" }} // Optional: Add spacing between checkbox and label
                      />
                      <label htmlFor={`event_${event.id}`}>
                        {event.name.length > 30
                          ? event.name.slice(0, 30) + "..."
                          : event.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="popup-buttons">
              <button
                className="loginButton"
                onClick={closeModal}
                type="button"
              >
                <span>Cancel</span>
              </button>
              <button
                className="loginButton"
                disabled={mutation.isLoading}
                type="submit"
              >
                <span>{mutation.isLoading ? "requesting..." : "Submit"}</span>
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

HostTicketOrders.propTypes = {
  value: PropTypes.number,
  row: PropTypes.number,
};

export default HostTicketOrders;
