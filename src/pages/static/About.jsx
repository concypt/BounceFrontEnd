import { useEffect, useState } from "react";
// import styles from "../about.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file

function About() {
  const [categories, setCategories] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to fetch categories from API
  useEffect(() => {
    // Make the fetch request with headers inline
    fetch("https://bounce.extrasol.co.uk/api/attenders/categories", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response contains a 'data' array with category objects
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Function to update selected count
  const updateSelectedCount = () => {
    const selectedCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    setSelectedCount(selectedCheckboxes.length);
  };

  // Function to handle date range change
  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Function to toggle date picker visibility
  const toggleDatePicker = (event) => {
    // Check if the click event occurred inside the date picker
    if (event.target.closest(".rdrDateRangeWrapper")) {
      // Click occurred inside the date picker, do not toggle visibility
      return;
    }
    // Click occurred outside the date picker, toggle visibility
    setShowDatePicker(!showDatePicker);
  };

  return (
    <>
      <div className="bounce_bg_circle">
        <div className={styles.filterFrame}>
          <div className={styles.filters}>
            <h1>Filter</h1>
            <form onSubmit={handleSubmit} className={styles.searchDiv}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Enter your search terms here..."
                name="search"
                required
              />
              <button type="submit">Search</button>
            </form>
            <div className={styles.mainFilters}>
              <div className={styles.mainCheckbox}>
                <h2>
                  Genres{" "}
                  <span id="selectedCount">({selectedCount} selected)</span>
                  <input type="checkbox" className={styles.smallCheckbox} />
                </h2>
                <form id="categoryForm" className={styles.mainCheckForm}>
                  {categories.map((category, index) => (
                    <CheckboxTag
                      key={index}
                      id={`categoryCheckbox-${index}`}
                      value={category.id} // Assuming 'id' is used as value
                      label={category.name}
                      updateSelectedCount={updateSelectedCount}
                    />
                  ))}
                </form>
              </div>
              <div className={styles.locationFields}>
                <h2>
                  Location{" "}
                  <input type="checkbox" className={styles.smallCheckbox} />
                </h2>
                <div className={styles.locationInputs}>
                  <div className={styles.locationSearch}>
                    <img src="images/location_grey.svg" alt="" />
                    <input type="search" name="" />
                  </div>
                  <select name="cars" id="cars" defaultValue="">
                    <option value="" disabled>
                      Within 0 miles
                    </option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
              <div className={styles.dateRange}>
                <h2>
                  Between these dates{" "}
                  <input type="checkbox" className={styles.smallCheckbox} />
                </h2>
                <div onClick={toggleDatePicker} className={styles.dateFields}>
                  <input
                    type="text"
                    placeholder="Start date"
                    value={dateRange[0].startDate.toLocaleDateString()}
                    readOnly
                  />
                  <p> To </p>
                  <input
                    type="text"
                    placeholder="End date"
                    value={dateRange[0].endDate?.toLocaleDateString()}
                    readOnly
                  />
                  {showDatePicker && (
                    <DateRangePicker
                      onChange={handleDateRangeChange}
                      months={1} // Display only one month per tab
                      ranges={dateRange}
                      direction="horizontal"
                      editableDateInputs={false}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Render EventList component with the events data */}
        <div className={styles.eventList}>
          <EventList className={styles.eventsGrid} />
        </div>
      </div>
    </>
  );
}

function CheckboxTag({ id, value, label, updateSelectedCount }) {
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
}

export default About;
4;
