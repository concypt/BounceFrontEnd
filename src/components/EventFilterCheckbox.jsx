import PropTypes from "prop-types";

import styles from "./eventFilterCheckbox.module.css";
const EventFilterCheckbox = ({ id, value, label, handleCatCheck }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name="categories"
        value={value}
        onChange={handleCatCheck}
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
  handleCatCheck: PropTypes.func,
};
export default EventFilterCheckbox;
