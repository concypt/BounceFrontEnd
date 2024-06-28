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
import { useMutation , useQueryClient } from "@tanstack/react-query";
import "../../../pages/Dashboard/styles/primaryStyles.css";
import "../../../pages/Dashboard/styles/comonStyles.css";
import {
  requestRefundAction,
  ticketsSend,
} from "../../../api/musecureService";

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
// images
import deleteImg from "../../../assets/images/event-dash-icon-delete.svg";
import paginatePrev from "../../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../../assets/images/pagination-arrow-next.svg";
import viewImg from "../../../assets/images/event-dash-icon-view.svg";

const HostTicketOrders = ({ ordersData  , event,sold_tickets , total_tickets , tickets}) => {
 
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    tickets_id: [],
    quantities: {},
    event_id: event.id
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
    event_id: ""
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
  
  const handleTicketChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({
      ...formData,
      tickets_id: selectedOptions,
    });
  };
   // Handle change for quantity input
   const handleQuantityChange = (ticketId, quantity) => {
    setFormData({
      ...formData,
      quantities: {
        ...formData.quantities,
        [ticketId]: quantity
      }
    });
  };
  // Function to add a quantity input field
  const addQuantityInput = (ticketId) => {
    return (
      <div key={ticketId} className="label-with-button">
        <input
          type="number"
          placeholder="Quantity"
          name="quantities"
          value={formData.quantities[ticketId] || ''}
          onChange={(e) => handleQuantityChange(ticketId, e.target.value)}
          className="popupInput"
        />
      </div>
    );
  };

 // Seelect Tickets
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
      icon: 'question',
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
  const handleRefund = (id,status) => {
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
        };
        mutation.mutate(formData);
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
        Header: "Order#",
        accessor: "order_id",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Customer Name",
        accessor: (row) => `${row.customer.first_name} ${row.customer.last_name}`,
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Events",
        Cell: () => (
          <div>{event.name}</div>
        ),
      },
      {
        Header: "Payment",
        accessor: "payment",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? "£" + value.slice(0, 20) + "..." : "£" + value}</div>
        ),
      },
      
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="actionsColumn">
            <button onClick={() => handleRefund(row.original.refund_details.id,2)}>
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
      data: ordersData ,
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
      <h2>Tickets Orders</h2>
      <button className="loginButton" onClick={openModal} type="submit"> <span>Send tickets</span></button>
      <h2>{sold_tickets}/{total_tickets} Available</h2>
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
                placeholder="First Name"
                name="first_name"
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
                value={formData.email}
                onChange={handleInputChange}
                className="popupInput"
              />
            </div>
            <div className="label-with-button">
              <select
                multiple
                name="tickets_id"
                value={formData.tickets_id}
                onChange={handleTicketChange}
                className="popupInput"
              >
                {/* Dynamically render options */}
                {tickets.map((ticket) => (
                  <option key={ticket.id} value={ticket.id}>
                    {ticket.name.length > 15
                      ? ticket.name.slice(0, 15) + "..."
                      : ticket.name}
                  </option>
                ))}
              </select>
            </div>
            {formData.tickets_id.map((ticketId) => addQuantityInput(ticketId))}
            <div className="popup-buttons">
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
              <button
                type="submit"
                className="global_button_on"
                disabled={mutation.isLoading}
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
