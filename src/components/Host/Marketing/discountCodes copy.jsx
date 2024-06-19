import React, { useEffect, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "../../../pages/Dashboard/styles/primaryStyles.css";
import "../../../pages/Dashboard/styles/comonStyles.css";
import Modal from "react-modal";
import { useMutation } from "@tanstack/react-query";

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
    maxWidth: "700px",
  },
  
};

Modal.setAppElement("#root");
//images
import deleteImg from "../../../assets/images/event-dash-icon-delete.svg";
import paginatePrev from "../../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../../assets/images/pagination-arrow-next.svg";

const HostTicketOrders = () => {
 

  const [coupons, setTableData] = useState([]);
  const [events, setEventsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/user/coupon",
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
      setTableData(data.data.coupon);
      setEventsData(data.data.events)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    coupon_code: "",
    event_id: [],
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
 const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(
        "https://bounce.extrasol.co.uk/api/user/coupon",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      return response.json();
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Coupon Added successfully!",
        timer: 2000,
      });
      setFormData({
        name: "",
        discount: "",
        coupon_code: "",
        event_id: [],
      });
      fetchData();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error submitting form: ${error.message}`,
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    closeModal();
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
            `https://bounce.extrasol.co.uk/api/user/coupon/${id}`,
            {
              method: "DELETE",
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
            prevData.filter((coupon) => coupon.id !== id)
          );
          Swal.fire("Deleted!", "Your coupon has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting coupon:", error);
          Swal.fire("Error!", "Failed to delete coupon.", "error");
        }
      }
    });
  };

  const columns = React.useMemo(
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
        Header: "Events",
        accessor: "events",
        sortType: "basic",
        Cell: ({ row }) => (
          <div>
            {row.original.events
              ? row.original.events.slice(0, 3).map((event) => (
                  <span key={event.id}>
                    {event.name.length > 15 ? event.name.slice(0, 15) + "..." : event.name}
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
            <button onClick={() => handleDelete(row.original.id)}>
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
    { columns, data: coupons, initialState: { pageIndex: 0, pageSize: 5 } },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <div className="ticketOrders">
      <div className="searchBar">
        <h2>Discount codes</h2>
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Upload Excel File"
        >
          <h2>Create a new list</h2>
          <form onSubmit={handleSubmit}>
      <div className="label-with-button">
        <input
          type="text"
          placeholder="Name"
          name="name"
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
          value={formData.coupon_code}
          onChange={handleInputChange}
          className="popupInput"
        />
      </div>
      <div className="label-with-button">
        <input
          type="number"
          placeholder="Discount"
          name="discount"
          value={formData.discount}
          onChange={handleInputChange}
          className="popupInput"
        />
      </div>
      <div className="label-with-button">
      <select
        multiple
        name="event_id"
        value={formData.event_id}
        onChange={handleEventIdChange}
        className="popupInput"
      >
        {/* Dynamically render options */}
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name.length > 15 ? event.name.slice(0, 15) + "..." : event.name}
          </option>
        ))}
      </select>
      </div>
      <div className="popup-buttons">
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
        <button
        type="submit"
        className="global_button_on"
        disabled={mutation.isLoading}
      >
        <span>
          {mutation.isLoading ? "requesting..." : "Submit"}
        </span>
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
