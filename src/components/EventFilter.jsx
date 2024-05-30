import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import EventFilterCheckbox from "./EventFilterCheckbox";
import styles from "./eventFilter.module.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file
//images
import locationImage from "../assets/images/location_grey.svg";

const URL = "/api/attenders/categories";
let config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
  },
};

const EventFilter = ({
  setSearchKeywords,
  setSelectedCategories,
  setLocation,
  setLocationMiles,
  setDateParameter,
}) => {
  //const [categories, setCategories] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const today = new Date();
  const endDateNumber = today.setDate(today.getDate() + 6);
  const endDate = new Date(endDateNumber);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: endDate,
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to fetch categories from API
  const fetchCategories = async () => {
    const { data } = await axios.get(URL, config).then((res) => res.data);
    return data;
  };

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Function to update selected count for categories
  const updateSelectedCount = () => {
    const selectedCheckboxes = document.querySelectorAll(
      '#categoriesFilter input[type="checkbox"]:checked'
    );
    if (selectedCheckboxes.length > 0) {
      document.getElementById("categoryCheckbox").checked = true;
    } else {
      document.getElementById("categoryCheckbox").checked = false;
    }
    setSelectedCount(selectedCheckboxes.length);
    let checkboxValues = Array.prototype.map.call(
      selectedCheckboxes,
      function (e) {
        return e.value;
      }
    );
    setSelectedCategories(checkboxValues);
  };

  const handleKeywordsChange = (e) => {
    const delayDebounceFn = setTimeout(() => {
      setSearchKeywords(e.target.value);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  };

  const handleLocationChange = (e) => {
    if (e.target.value.length > 0) {
      document.getElementById("locationCheckbox").checked = true;
    } else {
      document.getElementById("locationCheckbox").checked = false;
    }
    setLocation(e.target.value);
  };

  const handleMilesChange = (e) => {
    setLocationMiles(e.target.value);
  };

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
    document.getElementById("dateCheckbox").checked = true;

    const sd = dateRange[0].startDate;
    const ed = dateRange[0].endDate;

    const dateParameter =
      sd.getMonth() +
      1 +
      "/" +
      sd.getDate() +
      "/" +
      sd.getFullYear() +
      "+-+" +
      (ed.getMonth() + 1) +
      "/" +
      ed.getDate() +
      "/" +
      ed.getFullYear();

    setDateParameter(dateParameter);
  };

  // Function to handle form submission
  const handleSearch = () => {
    console.log("why this search button");
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

  if (isLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ textAlign: "center", width: "100%" }}>Loading...</p>
      </div>
    );
  }
  if (error) {
    return <p>Errors: {error.message}</p>;
  }

  return (
    <>
      <div className="bounce_bg_circle">
        <div className="custom-wrapper">
          <div className={styles.filterFrame}>
            <div className={styles.filters}>
              <h1>Filter</h1>
              <div className={styles.searchDiv}>
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="Enter your search terms here..."
                  name="search"
                  onChange={handleKeywordsChange}
                  required
                />
                <button onClick={handleSearch}>Search</button>
              </div>
              <div className={styles.mainFilters}>
                <div className={styles.mainCheckbox}>
                  <h2>
                    Genres{" "}
                    <span id="selectedCount">({selectedCount} selected)</span>
                    <input
                      id="categoryCheckbox"
                      type="checkbox"
                      className={styles.smallCheckbox}
                    />
                  </h2>
                  <div id="categoriesFilter" className={styles.mainCheckForm}>
                    {categories.map((category, index) => (
                      <EventFilterCheckbox
                        key={category.id}
                        id={`categoryCheckbox-${index}`}
                        value={category.id} // Assuming 'id' is used as value
                        label={category.name}
                        updateSelectedCount={updateSelectedCount}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.locationFields}>
                  <h2>
                    Location{" "}
                    <input
                      id="locationCheckbox"
                      type="checkbox"
                      className={styles.smallCheckbox}
                    />
                  </h2>
                  <div className={styles.locationInputs}>
                    <div className={styles.locationSearch}>
                      <img src={locationImage} alt="" />
                      <input
                        type="search"
                        name="location"
                        onChange={handleLocationChange}
                      />
                    </div>
                    <select
                      name="miles"
                      id="miles"
                      defaultValue="40"
                      onChange={handleMilesChange}
                    >
                      <option value="40">Within 40 miles</option>
                      <option value="30">Within 30 miles</option>
                      <option value="20">Within 20 miles</option>
                      <option value="10">Within 10 miles</option>
                      <option value="5">Within 5 miles</option>
                    </select>
                  </div>
                </div>
                <div className={styles.dateRange}>
                  <h2>
                    Between these dates{" "}
                    <input
                      id="dateCheckbox"
                      type="checkbox"
                      className={styles.smallCheckbox}
                    />
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
                      value={dateRange[0].endDate.toLocaleDateString()}
                      readOnly
                    />
                    {showDatePicker && (
                      <DateRangePicker
                        onChange={handleDateRangeChange}
                        className={styles.rdrDateRangePickerWrapper}
                        months={2} // Display only one month per tab
                        ranges={dateRange}
                        direction="horizontal"
                        editableDateInputs={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
EventFilter.propTypes = {
  setSearchKeywords: PropTypes.func,
  setSelectedCategories: PropTypes.func,
  setLocation: PropTypes.func,
  setLocationMiles: PropTypes.func,
  setDateParameter: PropTypes.func,
};
export default EventFilter;
