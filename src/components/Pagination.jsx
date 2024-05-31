import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./pagination.module.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setPage,
  page,
  setEventsPerPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const options = ["10", "20", "30", "40", "50"];
  useEffect(() => {
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className={styles.paginationWrapper}>
      <button
        className={styles.prevButton}
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
        disabled={page === 1}
      ></button>
      {pages.map((thisPage, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setPage(thisPage);
            }}
            className={thisPage === page ? styles.active : ""}
          >
            {thisPage}
          </button>
        );
      })}

      <button
        className={styles.nextButton}
        onClick={() => {
          if (page < pages.length) {
            setPage(page + 1);
          }
        }}
        disabled={page === pages.length}
      ></button>

      <div className={styles.dropDownContainer}>
        <p style={{ margin: 0 }}>Results per page: </p>
        <select
          onChange={(e) => {
            setEventsPerPage(parseInt(e.target.value));
          }}
          defaultValue={postsPerPage}
        >
          {options.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setEventsPerPage: PropTypes.func,
};

export default Pagination;
