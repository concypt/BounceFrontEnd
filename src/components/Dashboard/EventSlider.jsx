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
import closeIcon from "../../assets/images/close-icon.svg";
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
  });
  const [tickets, setTickets] = useState([
    { id: 1, info: "Ticket 1 Info" },
    { id: 2, info: "Ticket 2 Info" },
    { id: 3, info: "Ticket 3 Info" },
    { id: 4, info: "Ticket 4 Info" },
  ]);

  const openModal = (event) => {
    setModalIsOpen(true);
    setCurrentSlide(0);
    setEventInfo(event);
    setTickets(event.orders_tickets[0].child_orders);
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

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    if (selectedTicket && canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `ticket-${selectedTicket.id}-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error("Selected ticket or QR code canvas element not found");
    }
  };

  const shareQR = () => {
    if (navigator.share && selectedTicket) {
      const canvas = document.getElementById("qr-code");
      if (canvas) {
        canvas.toBlob((blob) => {
          const file = new File([blob], `ticket-${selectedTicket.id}-qr.png`, {
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
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: requestRefund,
    mutationKey: [requestRefund],
    onSuccess: (data) => {
      Swal.fire({
        title: "Success!",
        text: "Your Refund Request Send Successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClose();
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: "Request not Successfull",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", { orderId });
    formData.append("description", description);

    mutation.mutate(formData);
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

          1400: {
            slidesPerView: qS,
            spaceBetween: 10,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className={styles.mySwiper}
      >
        {events.map((event) => (
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
                    <img src={clockIcon} alt="" />{" "}
                    {moment(event.start_time).format("YYYY-MM-DD")}
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
                    <div className="bgGlobalBtn borderGlobalBtn">
                      <span>Find out more</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
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
              <button className={styles.slideButton} onClick={prevSlide}>
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
                <Link to="/home" className={styles.detailLink}>
                  View event page
                </Link>
              </div>
              <div className={styles.infoWrapper}>
                <div className={styles.eventDetailsList}>
                  <img src={popupCalendar} className={styles.iconImg} alt="" />
                  <p className={styles.listParagraph}>
                    {moment(eventInfo.date).format("dddd Do MMMM YYYY")}
                  </p>
                </div>
                <div className={styles.eventDetailsList}>
                  <img src={popupClock} className={styles.iconImg} alt="" />
                  <p className={styles.listParagraph}>5.00 PM</p>
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
                    Order number {tickets[currentSlide].order_id}
                  </p>
                  <span className={styles.paymentDone}>
                    <img src={popupPaymentDone} alt="" />
                    <p className={styles.paymentDoneText}>
                      Paid £28.00 for 4 tickets on the 28th April 2023 by card.
                    </p>
                  </span>
                  <Link
                    to=""
                    className={styles.detailLink}
                    onClick={handleShow}
                  >
                    Request Refund
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.qrCode}>
              <QRCode
                id="qr-code"
                value={`Ticket ID: ${tickets[currentSlide].id}`}
                className={styles.qrCodeImgCanva}
              />
              <div className={styles.modalActions}>
                <button
                  className="bgGlobalBtn borderGlobalBtn qrBtn"
                  onClick={downloadQR}
                >
                  <span>Download QR</span>
                </button>
                <button onClick={shareQR} className={styles.shareBtn}>
                  <img src={popupShareBtn} alt="" />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {show && (
        <div className={styles.modalRefund}>
          <div className={styles.modalContentRefund}>
            <span className={styles.closeBtn} onClick={handleClose}>
              &times;
            </span>
            <h2>Submit Form</h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" value={orderId} />
              <div className={styles.formGroup}>
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EventSlider;
