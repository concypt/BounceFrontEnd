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

  return (
    <div className={styles.paginationWrapper}>
      <button
        className={styles.prevButton}
        onClick={() => {
          globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      ></button>
      {pages.map((thisPage, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setPage(thisPage);
              globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
          globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      ></button>

      <div className={styles.dropDownContainer}>
        <p style={{ margin: 0 }}>Results per page: </p>
        <select
          onChange={(e) => setEventsPerPage(e.target.value)}
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
