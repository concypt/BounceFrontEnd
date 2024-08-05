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
import QRCode from "qrcode.react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../../../pages/Dashboard/styles/primaryStyles.css";
import "../../../pages/Dashboard/styles/comonStyles.css";
import styles from "../../Dashboard/eventslider.module.css";
import { requestRefundAction, ticketsSend } from "../../../api/musecureService";

// Styles for Modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    paddingRight: "0",
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
import viewImg from "../../../assets/images/event-dash-icon-view.svg";
//images
import closeIcon from "../../../assets/images/closeicon.svg";
import popupCalendar from "../../../assets/images/popup-calendar.svg";
import popupClock from "../../../assets/images/popup-clock.svg";
import popupLocation from "../../../assets/images/popup-location.svg";
import popupPaymentDone from "../../../assets/images/popup-payment-done.svg";
import popupShareBtn from "../../../assets/images/popup-share-btn.svg";

const HostTicketOrders = ({
  ordersData,
  event,
  sold_tickets,
  total_tickets,
  tickets,
}) => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderInfo, setorderInfo] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    tickets_id: [],
    quantities: {},
    event_id: event.id,
  });
  const mutations = useMutation({
    mutationFn: ticketsSend,
    mutationKey: ["ticketsSend"],
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Ticket Send successfully!",
        timer: 2000,
      });
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        tickets_id: [],
        quantities: {},
        event_id: "",
      });
      queryClient.invalidateQueries("ordersData");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedEventIds = [...formData.tickets_id]; // Make a copy of the current event_ids array

    if (checked) {
      updatedEventIds.push(value); // Add the value to the array if checkbox is checked
    } else {
      updatedEventIds = updatedEventIds.filter((id) => id !== value); // Remove the value if checkbox is unchecked
    }

    setFormData({
      ...formData,
      tickets_id: updatedEventIds, // Update the event_ids array in the formData state
    });
  };
  // Handle change for quantity input
  const handleQuantityChange = (ticketId, quantity) => {
    setFormData({
      ...formData,
      quantities: {
        ...formData.quantities,
        [ticketId]: quantity,
      },
    });
  };
  // Function to add a quantity input field
  const addQuantityInput = (ticketId) => {
    return (
      <div key={ticketId} className="label-with-button">
        <input
          type="number"
          placeholder={`T#${ticketId} QTY`}
          name="quantities"
          value={formData.quantities[ticketId] || ""}
          onChange={(e) => handleQuantityChange(ticketId, e.target.value)}
          className="popupInput"
        />
      </div>
    );
  };

  // Select Tickets
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit the form?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#7357FF",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        setModalIsOpen(false);
        mutations.mutate(formData);
      }
    });
  };
  // Modal End
  const navigate = useNavigate();

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

  //Ticket order modal start
  const handleView = (event) => {
    // console.log("event", event);
    setorderInfo(event);
    setIsModalOpen(true);
    // console.log(`View button clicked for row with id: ${event.id}`);
  };

  const closeTicketModal = () => {
    setIsModalOpen(false);
  };

  const downloadQR = (ticketId) => {
    const canvas = document.getElementById("qr-code");
    setSelectedTicket(ticketId);
    if (selectedTicket && canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `bounce-ticket-${ticketId}-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error("Selected ticket or QR code canvas element not found");
    }
  };

  const shareQR = (ticketId) => {
    setSelectedTicket(ticketId);
    if (navigator.share && selectedTicket) {
      const canvas = document.getElementById("qr-code");
      if (canvas) {
        canvas.toBlob((blob) => {
          const file = new File([blob], `bounce-ticket-${ticketId}-qr.png`, {
            type: "image/png",
          });
          navigator
            .share({
              title: "Ticket QR Code",
              text: "Here is the QR code for your ticket",
              files: [file],
            })
            .then(() => {
              console.log("Shared successfully");
            })
            .catch((error) => {
              console.error("Share failed:", error);
            });
        }, "image/png");
      } else {
        console.error("QR code canvas element not found");
      }
    } else {
      alert("Sharing is not supported in this browser or no ticket selected.");
    }
  };

  //table start
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
        accessor: (row) => {
          // Extract first name and last name from selectedUser, with fallbacks
          const firstName = row.selectedUser?.first_name || row.selectedUser?.name || '';
          const lastName = row.selectedUser?.last_name || '';
          return `${firstName} ${lastName}`.trim();
        },
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },

      {
        Header: "Events",
        Cell: () => <div>{event.name}</div>,
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
            <button onClick={() => handleView(row.original)}>
              <img src={viewImg} alt="View" />
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
      data: ordersData,
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
        <h2>Tickets Orders</h2>
        <button className="loginButton" onClick={openModal} type="submit">
          {" "}
          <span>Send tickets</span>
        </button>
        <h2>
          {sold_tickets}/{total_tickets} Available
        </h2>
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
          <div className="send-tickets-modal-form">
            <form onSubmit={handleSubmit}>
              <div className="discount-grid-popup">
                <div className="discount-grid-column">
                  <h2>Send Tickets</h2>
                  <div className="label-with-button">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="popupInput"
                    />
                  </div>
                  <div className="label-with-button">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="popupInput"
                    />
                  </div>
                  <div className="label-with-button">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="popupInput"
                    />
                  </div>
                </div>
                <div className="discount-grid-column second-column">
                  <div className="label-with-button">
                    <label
                      htmlFor=""
                      className="multiple-events-discount-label"
                    >
                      Applies to
                    </label>
                    <div
                      className="popupInputTextarea"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {/* Dynamically render checkboxes */}
                      {Array.isArray(tickets) && tickets.length > 0 ? (
                        tickets.map((ticket) => (
                          <div
                            key={ticket.id}
                            style={{
                              marginBottom: "15px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              id={`event_${ticket.id}`}
                              name={`tickets_id`}
                              required
                              value={ticket.id}
                              className="myCustomMultiSelectCheckboxes"
                              onChange={handleCheckboxChange}
                              style={{ marginRight: "13px" }} // Optional: Add spacing between checkbox and label
                            />
                            <label htmlFor={`event_${ticket.id}`}>
                              {ticket.name.length > 40
                                ? ticket.name.slice(0, 40) + "..."
                                : ticket.name}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p>No tickets available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ticket-chekcboxes-grid">
                {formData.tickets_id.map((ticketId) =>
                  addQuantityInput(ticketId)
                )}
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
          </div>
        </Modal>

        {/* tickets modal */}
        <div className={styles.modalWrapper}>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Ticket Modal"
            className={styles.modal}
            overlayClassName={styles.overlay}
          >
            <img
              src={closeIcon}
              alt="Close"
              className={styles.closeIcon}
              onClick={closeTicketModal}
            />
            {orderInfo && (
              <div className={styles.modalContent}>
                <div className={styles.ticketInfo}>
                  <div className={styles.titleWrapper}>
                    <h1 className={styles.ticketTitle}>{event.name}</h1>
                    <Link to="/home" className={styles.detailLink}>
                      View event page
                    </Link>
                  </div>
                  <div className={styles.infoWrapper}>
                    <div className={styles.eventDetailsList}>
                      <img
                        src={popupCalendar}
                        className={styles.iconImg}
                        alt=""
                      />
                      <p className={styles.listParagraph}>
                        {moment(event.date).format("dddd Do MMMM YYYY")}
                      </p>
                    </div>
                    <div className={styles.eventDetailsList}>
                      <img src={popupClock} className={styles.iconImg} alt="" />
                      <p className={styles.listParagraph}>5.00 PM</p>
                    </div>
                    <div className={styles.eventDetailsList}>
                      <img
                        src={popupLocation}
                        className={styles.iconImg}
                        alt=""
                      />
                      <p className={styles.listParagraph}>{event.address}</p>
                      <Link to="/home" className={styles.detailLink}>
                        Get directions
                      </Link>
                    </div>
                    <div className={styles.paymentSection}>
                      <h3 className={styles.paymentHeading}>Payment</h3>
                      <p className={styles.orderNumber}>
                        Order number {orderInfo.order_id}
                      </p>
                      <span className={styles.paymentDone}>
                        <img src={popupPaymentDone} alt="" />
                        <p className={styles.paymentDoneText}>
                          Paid £{orderInfo.payment} for 1 ticket on the{" "}
                          {moment(orderInfo.created_at).format(
                            "dddd Do MMMM YYYY"
                          )}{" "}
                          by card.
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.qrCode}>
                  <QRCode
                    id="qr-code"
                    value={`Ticket ID: ${orderInfo.id}`}
                    className={styles.qrCodeImgCanva}
                  />
                  <div className={styles.modalActions}>
                    <button
                      className="bgGlobalBtn borderGlobalBtn qrBtn"
                      onClick={() => downloadQR(orderInfo.id)}
                    >
                      <span>Download QR</span>
                    </button>
                    <button
                      onClick={() => shareQR(orderInfo.id)}
                      className={styles.shareBtn}
                    >
                      <img src={popupShareBtn} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Modal>
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
