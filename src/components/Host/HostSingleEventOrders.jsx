import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";
import "../../pages/Dashboard/styles/primaryStyles.css";
import "../../pages/Dashboard/styles/comonStyles.css";

// images
import viewImg from "../../assets/images/event-dash-icon-view.svg";
import paginatePrev from "../../assets/images/pagination-arrow-prev.svg";
import paginateNext from "../../assets/images/pagination-arrow-next.svg";
import { fetchTicketOrders } from "../../api/secureService";
import LoadingBar from "react-top-loading-bar";

const HostTicketOrders = () => {
  console.log("hostticketorders");
  const { eventId } = useParams();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchTicketOrders(eventId);
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const handleView = (id) => {
    console.log(`View button clicked for row with id: ${id}`);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
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
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="actionsColumn">
            <button onClick={() => handleView(row.original.id)}>
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
    { columns, data: tableData, initialState: { pageIndex: 0, pageSize: 5 } },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  const generatePageNumbers = () => {
    console.log("generating numbers");
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

  console.log("page numbers:", pageNumbers);

  // if (loading) {
  //   return <LoadingBar color="#7e79ff" height={3} progress={10} />;
  // }

  return (
    <div>
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
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  No orders found
                </td>
              </tr>
            ) : (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.original.order_id}>
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
  );
};

HostTicketOrders.propTypes = {
  value: PropTypes.number,
  row: PropTypes.number,
};

export default HostTicketOrders;
