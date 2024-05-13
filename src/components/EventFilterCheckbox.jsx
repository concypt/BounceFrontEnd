import PropTypes from "prop-types";

import styles from "./eventFilterCheckbox.module.css";
const EventFilterCheckbox = ({ id, value, label, updateSelectedCount }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name="categories"
        value={value}
        onChange={updateSelectedCount}
      />
      <label className={styles.checkboxTag} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

EventFilterCheckbox.propTypes = {
  id: PropTypes.string,
  value: PropTypes.number,
  label: PropTypes.string,
  updateSelectedCount: PropTypes.func,
};
export default EventFilterCheckbox;
