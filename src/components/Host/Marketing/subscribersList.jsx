import { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import "../../../pages/Dashboard/styles/primaryStyles.css";
import "../../../pages/Dashboard/styles/comonStyles.css";
import { deleteSubscriber } from "../../../api/secureService";
import { subscriberList, fetchEditData } from "../../../api/musecureService";

//images

import paginatePrev from "../../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../../assets/images/pagination-arrow-next.svg";
import viewImg from "../../../assets/images/event-dash-icon-view.svg";
import editImg from "../../../assets/images/event-dash-icon-edit.svg";

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
    width: "95%",
  },
};

Modal.setAppElement("#root");

const SubscribersList = ({ subscribe_list, onDeleteCampaign }) => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to open the modal for creating new item
  const openModal = () => {
    setFormData({
      name: "",
      // Clear other fields as needed
    });
    setEditItemId(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormData({
      name: "",
      // Clear other fields as needed
    });
    setEditItemId(null);
  };

  const openEditModal = (id) => {
    const {
      data: itemToEdit,
      error,
      isLoading,
    } = useQuery({
      queryKey: ["fetchEditData"],
      queryFn: fetchEditData,
    });

    // if (isLoading && !marketing)
    //   return (
    //     <div
    //       style={{
    //         width: "100vw",
    //         height: "90vh",
    //         display: "flex",
    //         alignContent: "center",
    //         alignItems: "center",
    //       }}
    //     >
    //       <p style={{ textAlign: "center", width: "100%" }}>Loading...</p>
    //     </div>
    //   );

    if (error) {
      return <p>Error: {error.message}</p>;
    }
    // console.log(itemToEdit);
    setFormData({
      name: itemToEdit.name,
      // Add other fields as needed
    });
    setEditItemId(id);
    setModalIsOpen(true);
  };

  //Form Submit
  const [formData, setFormData] = useState({
    name: " ",
  });
  const [editItemId, setEditItemId] = useState(null);
  const mutations = useMutation({
    mutationFn: subscriberList,
    mutationKey: ["subscriberList"],
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New SubscriberList Created successfully!",
        timer: 2000,
      });
      setFormData({
        name: " ",
      });
      queryClient.invalidateQueries("subscriberList");
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItemId) {
      // Handle update logic using editItemId
      // Example: await updateItem(editItemId, formData);
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to submit the form?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7357FF",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          mutations.mutate(formData);
        }
      });
    }

    setModalIsOpen(false);
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
          <div>
            {value && value.length > 20 ? value.slice(0, 20) + "..." : value}
          </div>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="actionsColumn">
            <Link to={`/host-subscribe-list/${row.original.id}`}>
              <button>
                <img src={viewImg} alt="Delete" />
              </button>
            </Link>
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
      data: subscribe_list,
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
    <div className="ticketOrders promotertable">
      <div className="searchBar">
        <h2>Subscriber Lists</h2>
        <button className="loginButton" onClick={openModal}>
          <span>Create new list</span>
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
          <h2>Create a new list</h2>

          <form onSubmit={handleSubmit}>
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
                disabled={mutations.isLoading}
                type="submit"
              >
                <span>Submit</span>
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

SubscribersList.propTypes = {
  value: PropTypes.number,
  row: PropTypes.number,
};

export default SubscribersList;
