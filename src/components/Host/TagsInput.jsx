import { useState } from "react";
import PropTypes from "prop-types";
import "./TagsInput.css"; // Import the CSS file for styling

const TagsInput = ({ tags, onTagsChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,$/, "");
      if (newTag && !tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const handleTagRemove = (indexToRemove) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="tags-input-container">
      {tags.map((tag, index) => (
        <div key={index} className="tag">
          {tag}
          <span
            className="tag-close-icon"
            onClick={() => handleTagRemove(index)}
          >
            &times;
          </span>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type and hit Enter or comma"
      />
    </div>
  );
};

TagsInput.propTypes = {
  tags: PropTypes.array,
  onTagsChange: PropTypes.func,
};

export default TagsInput;
