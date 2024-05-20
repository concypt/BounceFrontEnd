import PropTypes from "prop-types";
import styles from "./pagination.module.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className={styles.paginationWrapper}>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setCurrentPage(page);
              globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className={page == currentPage ? styles.active : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
Pagination.propTypes = {
  totalPosts: PropTypes.number,
  postsPerPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
};
export default Pagination;
