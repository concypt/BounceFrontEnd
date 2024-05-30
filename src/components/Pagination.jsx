// import PropTypes from "prop-types";
// import styles from "./pagination.module.css";

// const Pagination = ({ totalPosts, postsPerPage, setPage, page }) => {
//   console.log("totalPosts:", totalPosts);
//   console.log("postsPerPage:", postsPerPage);
//   let pages = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pages.push(i);
//   }
//   return (
//     <div className={styles.paginationWrapper}>
//       {console.log(pages)}
//       {pages.map((thisPage, index) => {
//         return (
//           <button
//             key={index}
//             onClick={() => {
//               setPage(thisPage);
//               globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//             }}
//             className={thisPage == page ? styles.active : ""}
//           >
//             {thisPage}
//           </button>
//         );
//       })}
//     </div>
//   );
// };
// Pagination.propTypes = {
//   totalPosts: PropTypes.number,
//   postsPerPage: PropTypes.number,
//   setPage: PropTypes.func,
//   page: PropTypes.number,
// };
// export default Pagination;

import PropTypes from "prop-types";
import styles from "./pagination.module.css";

const Pagination = ({ totalPosts, postsPerPage, setPage, page }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={styles.paginationWrapper}>
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
    </div>
  );
};

Pagination.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Pagination;
