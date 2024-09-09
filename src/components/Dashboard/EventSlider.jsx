import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMutation } from "@tanstack/react-query";
import { requestRefund } from "../../api/masabService";
import Swal from "sweetalert2";
import Modal from "react-modal";
import QRCode from "qrcode.react";
import moment from "moment";
import { Link } from "react-router-dom";
import styles from "./eventslider.module.css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

//images
import clockIcon from "../../assets/images/clock.svg";
import locationIcon from "../../assets/images/location.svg";
import closeIcon from "../../assets/images/closeicon.svg";
import popupCalendar from "../../assets/images/popup-calendar.svg";
import popupClock from "../../assets/images/popup-clock.svg";
import popupLeftArrow from "../../assets/images/popup-left-arrow.svg";
import popuprightArrow from "../../assets/images/popup-right-arrow.svg";
import popupLocation from "../../assets/images/popup-location.svg";
import popupPaymentDone from "../../assets/images/popup-payment-done.svg";
import popupShareBtn from "../../assets/images/popup-share-btn.svg";

Modal.setAppElement("#root");

const EventSlider = (props) => {
  const { events, slides } = props;
  const qS = parseInt(slides);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [eventInfo, setEventInfo] = useState({
    name: "event",
    location: "location",
    orders_tickets: [
      {
        order_id: "Order Id",
        order: [
          {
            order_id: 1,
            payment: "50",
          },
        ],
      },
    ],
  });
  const [tickets, setTickets] = useState([
    { id: 1, info: "Ticket 1 Info" },
    { id: 2, info: "Ticket 2 Info" },
    { id: 3, info: "Ticket 3 Info" },
    { id: 4, info: "Ticket 4 Info" },
  ]);

  //for tickets modal
  const openModal = (event) => {
    // console.log(event);
    setModalIsOpen(true);
    setCurrentSlide(0);
    setEventInfo(event);
    setSelectedTicket(event.orders_tickets[0]);
    setTickets(event.orders_tickets);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTicket(null);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === tickets.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? tickets.length - 1 : prevSlide - 1
    );
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

  // for request refund
  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: requestRefund,
    mutationKey: [requestRefund],
    onSuccess: (data) => {
      let  msg= "";
      
      if(data.data === 1){
        msg = "A refund request has already been applied for this order.";
      
      }
      else{
        msg = "Your refund request has been sent successfully.";
      }

      Swal.fire({
        title: "Success!",
        text: msg,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setDescription("");
        handleClose();
      });
    },
    onError: (error) => {
      console.error(
        "Error response:",
        error.response || error.message || error
      );
      setDescription("");
      handleClose();
      Swal.fire({
        title: "Error!",
        text: "Request not Successfull",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = (orderId) => {
    setOrderId(orderId);
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("order_id", orderId);
    formData.append("description", description);

    mutation.mutate(formData);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },

          1024: {
            slidesPerView: qS === 4 ? 2 : 2,
          },

          1280: {
            slidesPerView: qS === 4 ? 3 : 2,
          },

          1800: {
            slidesPerView: qS,
            spaceBetween: 10,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className={styles.mySwiper}
      >
        {events.map((event) => {
          const inputFormat = "DD/MM/YYYY HH:mm:ss";
          const startTime = moment(event.start_time, inputFormat);

          let formattedDate = "Invalid date";
          if (startTime.isValid()) {
            formattedDate = startTime.format("DD/MM/YYYY");
          }
          return (
            <SwiperSlide key={event.id} className={styles.eventSlide}>
              <div
                className={`${styles.eventCard} ${
                  qS === 4 ? styles.upcomingEventCard : ""
                }`}
              >
                <div className={styles.eventCardImage}>
                  <img
                    className={styles.eventImg}
                    src={event.image}
                    alt="Event image"
                  />
                  <div className={styles.eventCategoryButton}>
                    {event.category}
                  </div>
                </div>
                <div className={styles.eventCardDetails}>
                  <h2>{event.name}</h2>
                  <div className={styles.dateRemainingDaysDiv}>
                    <span className={styles.time}>
                      <img src={clockIcon} alt="" /> {formattedDate}
                    </span>
                    <div className={styles.remainingDaysBtn}>
                      <>{event.daysCount}</>
                    </div>
                  </div>
                  <div className={event.location ? styles.locationDiv : null}>
                    {event.location && (
                      <span className={styles.location}>
                        <img src={locationIcon} alt="" /> {event.location}
                      </span>
                    )}
                  </div>

                  <div className={styles.ticketsFindMore}>
                    {qS === 4 ? (
                      <div
                        className="bgGlobalBtn borderGlobalBtn"
                        onClick={() => openModal(event)}
                      >
                        <span>View ticket details</span>
                      </div>
                    ) : (
                      <Link
                        to={`/events/${event.id}`}
                        className="bgGlobalBtn borderGlobalBtn"
                      >
                        <span>Find out more</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* tickets modal */}

      <div className={styles.modalWrapper}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Ticket Slider Modal"
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <div className={styles.modalHeader}>
            <div className={styles.sliderInfo}>
              <button className={styles.slideButton} onClick={prevSlide}>
                <img
                  src={popupLeftArrow}
                  className={styles.popupArrowImg}
                  alt=""
                />
              </button>
              <span className={styles.slideCounter}>
                Ticket {currentSlide + 1} of {tickets.length}
              </span>
              <button className={styles.slideButton} onClick={nextSlide}>
                <img
                  src={popuprightArrow}
                  className={styles.popupArrowImg}
                  alt=""
                />
              </button>
            </div>
          </div>
          <img
            src={closeIcon}
            alt="Close"
            className={styles.closeIcon}
            onClick={closeModal}
          />

          <div className={styles.modalContent}>
            <div className={styles.ticketInfo}>
              <div className={styles.titleWrapper}>
                <h1 className={styles.ticketTitle}>{eventInfo.name}</h1>
                <Link
                  to={`/events/${eventInfo.id}`}
                  className={styles.detailLink}
                >
                  View event page
                </Link>
              </div>
              <div className={styles.infoWrapper}>
                <div className={styles.eventDetailsList}>
                  <img src={popupCalendar} className={styles.iconImg} alt="" />
                  <p className={styles.listParagraph}>
                  {moment(eventInfo.start_time, "DD/MM/YYYY HH:mm:ss").format("dddd Do MMMM YYYY")}
                  </p>
                </div>
                <div className={styles.eventDetailsList}>
                  <img src={popupClock} className={styles.iconImg} alt="" />
                  <p className={styles.listParagraph}>
                    {moment(eventInfo.start_time, "DD/MM/YYYY HH:mm:ss").format("hh:mm A")}
                  </p>
                </div>
                <div className={styles.eventDetailsList}>
                  <img src={popupLocation} className={styles.iconImg} alt="" />
                  <p className={styles.listParagraph}>{eventInfo.location}</p>
                  <Link to="/home" className={styles.detailLink}>
                    Get directions
                  </Link>
                </div>
                <div className={styles.paymentSection}>
                  <h3 className={styles.paymentHeading}>Payment</h3>
                  <p className={styles.orderNumber}>
                    Order number{" "}
                    {eventInfo.orders_tickets[currentSlide].order.order_id}
                  </p>
                  <span className={styles.paymentDone}>
                    <img src={popupPaymentDone} alt="" />
                    <p className={styles.paymentDoneText}>
                      Paid £
                      {eventInfo.orders_tickets[currentSlide].order.payment} for{" "}
                      {
                        eventInfo.orders_tickets[currentSlide].order
                          .quantity_count
                      }{" "}
                      ticket(s) on{" "}
                      {moment(
                        eventInfo.orders_tickets[currentSlide].created_at
                      ).format("dddd Do MMMM YYYY")}{" "}
                      by card.
                    </p>
                  </span>
                  <Link
                    to=""
                    className={styles.detailLink}
                    onClick={() =>
                      handleShow(
                        eventInfo.orders_tickets[currentSlide].order_id
                      )
                    }
                  >
                    Request Refund
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.qrCode}>
              <QRCode
                id="qr-code"
                value={`Ticket ID: ${eventInfo.orders_tickets[currentSlide].ticket_number}`}
                className={styles.qrCodeImgCanva}
              />
              <div className={styles.modalActions}>
                <button
                  className="bgGlobalBtn borderGlobalBtn qrBtn"
                  onClick={() =>
                    downloadQR(eventInfo.orders_tickets[currentSlide].ticket_number)
                    
                  }
                >
                  <span>Download QR</span>
                </button>
                <button
                  onClick={() =>
                    shareQR(eventInfo.orders_tickets[currentSlide].id)
                  }
                  className={styles.shareBtn}
                >
                  <img src={popupShareBtn} alt="" />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {/* Refund modal */}

      {show && (
        <div className={styles.modalRefund}>
          <div className={styles.modalContentRefund}>
            <span className={styles.closeBtn} onClick={handleClose}>
              &times;
            </span>
            <h2>Request Refund</h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="order_id" value={orderId} />
              <div className={styles.formGroup}>
                <label className={styles.labelDescription}>Description</label>
                <textarea
                  type="text"
                  placeholder="Please enter reason for refund"
                  required
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <button
                type="submit"
                className="bgGlobalBtn borderGlobalBtn qrBtn"
              >
                <span>Submit Request</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EventSlider;
