import PropTypes from "prop-types";
import styles from "./singleFAQ.module.css";

const SingleFAQ = ({ faq, currentFAQ, handleClick }) => {
  return (
    <div
      className={styles.accordianMain}
      onClick={() => handleClick(faq.id)}
      id={`question-${faq.id}`}
      key={faq.id}
    >
      <div
        className={
          styles.question +
          ` que${faq.id} ` +
          (faq.id === currentFAQ ? styles.open : "")
        }
      >
        <span>{faq.question}</span>
        <div className={styles.expandBar}></div>
      </div>
      <div
        className={
          styles.answer +
          ` ans${faq.id} ` +
          (faq.id === currentFAQ ? styles.open : "")
        }
      >
        {faq.answer}
      </div>
    </div>
  );
};

SingleFAQ.propTypes = {
  faq: PropTypes.object,
  currentFAQ: PropTypes.number,
  setCurrentFAQ: PropTypes.func,
  handleClick: PropTypes.func,
};
export default SingleFAQ;
