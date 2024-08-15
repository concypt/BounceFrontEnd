import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Modal from "react-modal";
import * as XLSX from "xlsx";
import { SendCampaign } from "../../../api/musecureService";
import "../../../pages/Dashboard/styles/primaryStyles.css";
import "../../../pages/Dashboard/styles/comonStyles.css";
import viewImg from "../../../assets/images/event-dash-icon-view.svg";
import editImg from "../../../assets/images/event-dash-icon-edit.svg";
import sendImg from "../../../assets/images/send-icon.svg";

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

// images
import deleteImg from "../../../assets/images/event-dash-icon-delete.svg";
import paginatePrev from "../../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../../assets/images/pagination-arrow-next.svg";
import { Link } from "react-router-dom";

const EmailList = ({ campaigns }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [entryCount, setEntryCount] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false);

  const SendCampaignMutation = useMutation({
    mutationFn: SendCampaign,
    mutationKey: ["SendCampaignMutation"],
    onSuccess: () => {
      Swal.fire("Send!", "Your Campaign send successfully.", "success");
    },
    onError: (error) => {
      console.error("Error Campaign:", error);
      Swal.fire("Error!", "Failed to delete event.", "error");
    },
  });
  const navigate = useNavigate();
  const handleEditCampaign = (id) => {
    navigate(`/host-campaigns-edit/${id}`);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
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

  const handleImport = () => {
    // Here you can perform any action with the imported data
    // console.log("Importing data...");
    // For demonstration purposes, let's just close the modal
    closeModal();
  };

  const handleSendCampaign = (campaign_id) => {
    // console.log(campaign_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7357FF",
      confirmButtonText: "Yes, Send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        SendCampaignMutation.mutate(campaign_id);
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
        Header: "Subject",
        accessor: "subject",
        sortType: "basic",
        Cell: ({ value }) => (
          <div>{value.length > 20 ? value.slice(0, 20) + "..." : value}</div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (value == 1 ? "Active" : "Inactive"),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="actionsColumn">
            <button title="Edit Campaign" onClick={() => handleEditCampaign(row.original.id)}>
              <img src={editImg} alt="Delete" />
            </button>
            <button title="Send Campaign"  onClick={() => handleSendCampaign(row.original.id)}>
              <img src={sendImg} alt="Campaign" />
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
    { columns, data: campaigns, initialState: { pageIndex: 0, pageSize: 20 } },
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

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  return (
    <div className="ticketOrders compaign-list">
      <div className="searchBar">
        <h2>Campaigns</h2>
        <Link to={"/host-campaigns/new"}>
          <button className="loginButton" type="button">
            <span>Create new campaign</span>
          </button>
        </Link>
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
          <input type="text" placeholder="Name" className="popupInput" />
          <form>
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
              className="file-input"
              accept=".xlsx, .xls"
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
                onClick={handleImport}
                type="button"
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
EmailList.propTypes = {
  value: PropTypes.number,
  row: PropTypes.number,
};

// EmailList.propTypes = {
//   eventId: PropTypes.number.isRequired,
// };

export default EmailList;
