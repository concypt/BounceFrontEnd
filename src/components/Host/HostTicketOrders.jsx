import { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";
import Modal from "react-modal";
import QRCode from "qrcode.react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../api/secureService";
import "../../pages/Dashboard/styles/primaryStyles.css";
import "../../pages/Dashboard/styles/comonStyles.css";
import styles from "../Dashboard/eventslider.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import viewImg from "../../assets/images/event-dash-icon-view.svg";
import paginatePrev from "../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../assets/images/pagination-arrow-next.svg";
import closeIcon from "../../assets/images/closeicon.svg";
import popupCalendar from "../../assets/images/popup-calendar.svg";
import popupClock from "../../assets/images/popup-clock.svg";
import popupLocation from "../../assets/images/popup-location.svg";
import popupPaymentDone from "../../assets/images/popup-payment-done.svg";
import popupShareBtn from "../../assets/images/popup-share-btn.svg";

const HostTicketOrders = () => {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const {
    data: apiResponse = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (Array.isArray(apiResponse) && apiResponse.length > 0) {
      setTableData(apiResponse);
    }
  }, [apiResponse]);

  const handleView = (event) => {
    setEventInfo(event);
    setIsModalOpen(true);
    //console.log(`View button clicked for row with id: ${event.id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "order_id",
        sortType: "basic",
      },
      {
        Header: "Event Name",
        accessor: "event.name",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Customer Name",
        accessor: (row) => {
          // Extract first name and last name from selectedUser, with fallbacks
          const firstName =
            row.selectedUser?.first_name || row.selectedUser?.name || "";
          const lastName = row.selectedUser?.last_name || "";
          return `${firstName} ${lastName}`.trim();
        },
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="actionsColumn">
            <button title="Order Details" onClick={() => handleView(row.original)}>
              <img src={viewImg} alt="View" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

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

  if (error) {
    console.log(error);
  }

  return (
    <>
      <div className="tableOne">
        <div className="searchBar">
          <h2>Ticket Orders</h2>
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search your orders"
          />
        </div>
        {isLoading ? (
          <div className="table-container">
            <Skeleton count={5} height={50} />
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
                {tableData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      style={{ textAlign: "center" }}
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  page.map((row) => {
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
                  })
                )}
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
      </div>
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
            onClick={closeModal}
          />
          {eventInfo && (
            <div className={styles.modalContent}>
              <div className={styles.ticketInfo}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.ticketTitle}>{eventInfo.event.name}</h1>
                  <Link to={`/events/${eventInfo.id}`} className={styles.detailLink}>
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
                      {moment(eventInfo.event.start_time).format("dddd Do MMMM YYYY")}
                    </p>
                  </div>
                  <div className={styles.eventDetailsList}>
                    <img src={popupClock} className={styles.iconImg} alt="" />
                    <p className={styles.listParagraph}>
                    {moment.utc(eventInfo.event.start_time).format("hh:mm A")}
                    </p>
                  </div>
                  <div className={styles.eventDetailsList}>
                    <img
                      src={popupLocation}
                      className={styles.iconImg}
                      alt=""
                    />
                    <p className={styles.listParagraph}>
                      {eventInfo.event.address}
                    </p>
                    <Link to="/home" className={styles.detailLink}>
                      Get directions
                    </Link>
                  </div>
                  <div className={styles.paymentSection}>
                    <h3 className={styles.paymentHeading}>Payment</h3>
                    <p className={styles.orderNumber}>
                      Order number {eventInfo.order_id}
                    </p>
                    <span className={styles.paymentDone}>
                      <img src={popupPaymentDone} alt="" />
                      <p className={styles.paymentDoneText}>
                        Paid £{eventInfo.payment} for this ticket on{" "}
                        {moment(eventInfo.created_at).format(
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
                  value={`Ticket ID: ${eventInfo.id}`}
                  className={styles.qrCodeImgCanva}
                />
                <div className={styles.modalActions}>
                  <button
                    className="bgGlobalBtn borderGlobalBtn qrBtn"
                    onClick={() => downloadQR(eventInfo.id)}
                  >
                    <span>Download QR</span>
                  </button>
                  <button
                    onClick={() => shareQR(eventInfo.id)}
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
    </>
  );
};

HostTicketOrders.propTypes = {
  value: PropTypes.number,
  row: PropTypes.number,
};

export default HostTicketOrders;
