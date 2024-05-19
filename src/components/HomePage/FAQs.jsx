import { useState } from "react";
import PropTypes from "prop-types";
import SingleFAQ from "./SingleFAQ";
import styles from "./faqs.module.css";

const FAQs = ({ FAQs }) => {
  const [currentFAQ, setCurrentFAQ] = useState(0);
  const handleClick = (faqID) => {
    //console.log(typeof faqID);
    if (currentFAQ != faqID) {
      setCurrentFAQ(faqID);
    } else {
      setCurrentFAQ(0);
    }
  };

  return (
    <div className={styles.faqAccordians}>
      <div className={styles.faqContainer}>
        {FAQs.map((faq) => (
          <SingleFAQ
            faq={faq}
            key={faq.id}
            setCurrentFAQ={setCurrentFAQ}
            currentFAQ={currentFAQ}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};
FAQs.propTypes = {
  FAQs: PropTypes.array,
};
export default FAQs;
