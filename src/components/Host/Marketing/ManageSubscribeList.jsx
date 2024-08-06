import { useState, useMemo } from "react";
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
import * as XLSX from "xlsx";
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
    width: "95%",
  },
};

Modal.setAppElement("#root");
import deleteImg from "../../../assets/images/event-dash-icon-delete.svg";
import paginatePrev from "../../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../../assets/images/pagination-arrow-next.svg";
import {
  deleteSubscriber,
  subscriberListPostData,
} from "../../../api/musecureService";

const ManageSubscribeList = ({
  subscribelist_Id,
  subscribeListData,
  onDeleteSubscribeList,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [entryCount, setEntryCount] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileData, setFileData] = useState(null);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    file: "",
    subscribe_list: "",
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubscriber,
    mutationKey: ["deleteSubscriber"],
    onSuccess: () => {
      Swal.fire("Deleted!", "Your subscriber has been deleted.", "success");
    },
    onError: (error) => {
      Swal.fire("Error!", "Failed to delete subscriber.", error);
    },
  });

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
        onDeleteSubscribeList(id);
      }
    });
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileData({
      fileData: file,
    });
    setFormData({
      ...formData,
      file: file,
      subscribe_list: subscribelist_Id,
    });
    if (file) {
      setFileName(file.name);
      setFileUploaded(true); // Set fileUploaded to true when a file is uploaded

      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        setEntryCount(data.length);
      };
      reader.readAsBinaryString(file);
    }
  };

  const mutations = useMutation({
    mutationFn: subscriberListPostData,
    mutationKey: ["subscriberListPostData"],
    onSuccess: (data, variables, context) => {
      // console.log("Success response data:", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New SubscriberList Created successfully!",
        timer: 2000,
      });
      setFormData({
        file: " ",
        subscribe_list: " ",
      });
      setFileData({
        fileData: "",
      });

      queryClient.invalidateQueries("subscriberListPostData");
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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (fileData) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to upload the file?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, upload it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.isConfirmed) {
          // console.log(formData);
          mutations.mutate(formData);
          setFormData({ subscribe_list: "" }); // Reset form data state
          setFileData(null); // Reset fileData state
          setFileName(""); // Reset fileName state
          setFileUploaded(false); // Reset fileUploaded state
          setEntryCount(0);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Upload cancelled :)", "info");
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
        Header: "Name",
        accessor: (row) => `${row.first_name} ${row.last_name}`,
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 30 ? value.slice(0, 30) + "..." : value}</div>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        sortType: "basic",
        Cell: ({ value }) => <div>{value == 1 ? "Active" : "Inactive"}</div>,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="actionsColumn">
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
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data: subscribeListData,
      initialState: { pageIndex: 0, pageSize: 10 },
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
        <h2>Subscribers Details</h2>
        <button className="loginButton" onClick={openModal}>
          <span>Import new list</span>
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
          <h2>Create list</h2>
          <form onSubmit={handleSubmit}>
            <div className="label-with-button">
              <label
                htmlFor="file-upload"
                className={`custom-file-upload ${
                  fileUploaded ? "file-uploaded" : ""
                }`}
              >
                {fileName ? fileName : "Upload CSV"}
              </label>
              <p>Please ensure the CSV has two columns, ‘name’ and ‘email’.</p>
            </div>
            <input
              id="file-upload"
              type="file"
              name="file"
              className="file-input"
              accept=".csv"
              onChange={handleFileUpload}
            />
            {entryCount > 0 && <p>Found {entryCount} contacts.</p>}
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
                type="submit"
                disabled={mutations.isLoading}
              >
                <span>Import</span>
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

ManageSubscribeList.propTypes = {
  value: PropTypes.number,
  row: PropTypes.number,
};

export default ManageSubscribeList;
