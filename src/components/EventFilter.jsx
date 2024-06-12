import { useEffect, useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { CatContext } from "../contexts/GlobalProvider";
import EventFilterCheckbox from "./EventFilterCheckbox";
import styles from "./eventFilter.module.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import locationImage from "../assets/images/location_grey.svg";
import caretUp from "../assets/images/CaretUp.svg";
import caretDown from "../assets/images/CaretDown.svg";

const EventFilter = ({
  setSearchKeywords,
  setSelectedCategories,
  selectedCategories = [],
  setLocation,
  location = "",
  setLocationMiles,
  setDateParameter,
  // dateParameter = "",
}) => {
  const [isFilter, setIsFilter] = useState(true);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isCategory, setIsCategory] = useState(false);
  const [isLocation, setIsLocation] = useState(false);
  const [isDate, setIsDate] = useState(false);

  const { categories } = useContext(CatContext);

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  // const fetchCategories = async () => {
  //   const { data } = await axios.get(URL, config).then((res) => res.data);
  //   return data;
  // };

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: fetchCategories,
  // });

  // useEffect(() => {
  //   if (data) {
  //     setCategories(data);
  //   }
  // }, [data, setCategories]);

  const handleCatCheck = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prevSelected) => {
      return checked
        ? [...prevSelected, value]
        : prevSelected.filter((category) => category !== value);
    });
  };

  const handleKeywordsChange = useCallback(
    (e) => {
      const { value } = e.target;
      const delayDebounceFn = setTimeout(() => {
        setSearchKeywords(value);
      }, 3000);

      return () => clearTimeout(delayDebounceFn);
    },
    [setSearchKeywords]
  );

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setIsLocation(value.length > 0);
    setLocation(value);
  };

  const handleMilesChange = useCallback(
    (e) => {
      setLocationMiles(parseInt(e.target.value));
    },
    [setLocationMiles]
  );

  //use this filter to reset filter on opening or closing filter pane
  // useEffect(() => {
  //   if (isFilter) {
  //     setSelectedCount(0);
  //     setIsCategory(false);
  //     setIsLocation(false);
  //     setIsDate(false);
  //     setSearchKeywords("");
  //     setSelectedCategories([]);
  //     setLocation("");
  //     setDateParameter("");
  //     setDateRange([
  //       {
  //         startDate: null,
  //         endDate: null,
  //         key: "selection",
  //       },
  //     ]);
  //   }
  // }, [
  //   isFilter,
  //   setSearchKeywords,
  //   setSelectedCategories,
  //   setLocation,
  //   setDateParameter,
  // ]);

  useEffect(() => {
    if (dateRange[0].startDate !== dateRange[0].endDate) {
      setShowDatePicker(false);
    }
  }, [dateRange]);

  useEffect(() => {
    !showDatePicker &&
    dateRange[0].startDate !== null &&
    dateRange[0].endDate !== null
      ? setIsDate(true)
      : setIsDate(false);
  }, [showDatePicker, dateRange]);

  useEffect(() => {
    if (dateRange[0].startDate !== null && dateRange[0].endDate !== null) {
      const sd = dateRange[0].startDate;
      const ed = dateRange[0].endDate;

      const datePara = `${
        sd.getMonth() + 1
      }/${sd.getDate()}/${sd.getFullYear()}+-+${
        ed.getMonth() + 1
      }/${ed.getDate()}/${ed.getFullYear()}`;
      setDateParameter(datePara);
    }
  }, [isDate, dateRange, setDateParameter]);

  const isMobile = window.matchMedia("(max-width: 700px)").matches;

  const handleSearch = () => {
    console.log("Search button clicked");
  };

  const toggleDatePicker = (event) => {
    if (event.target.closest(".rdrDateRangeWrapper")) return;
    setShowDatePicker((prevShowDatePicker) => !prevShowDatePicker);
  };

  const handleMainCheck = (element) => {
    const { id, checked } = element;
    if (!checked) {
      if (id === "categoryCheckbox") {
        setIsCategory(false);
        setSelectedCategories([]);
      }
      if (id === "locationCheckbox") {
        setIsLocation(false);
        setLocation("");
      }
      if (id === "dateCheckbox") {
        setDateRange([{ startDate: null, endDate: null, key: "selection" }]);
        setShowDatePicker(false);
        setDateParameter("");
        setIsDate(false);
      }
    }
  };

  useEffect(() => {
    setSelectedCount(selectedCategories.length);
    setIsCategory(selectedCategories.length > 0);

    if (selectedCategories.length === 0) {
      document
        .querySelectorAll('#categoriesFilter input[type="checkbox"]:checked')
        .forEach((checkbox) => (checkbox.checked = false));
    }
  }, [selectedCategories]);

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         width: "100vw",
  //         height: "90vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <p>Errors: {error.message}</p>;
  // }

  return (
    <div className="bounce_bg_circle">
      <div className="custom-wrapper">
        <div className={styles.filterFrame}>
          <div className={styles.filters}>
            <div className={styles.filterHeader}>
              <h1>Filter</h1>
              <button
                className={styles.filterSwitch}
                onClick={() => setIsFilter((prevIsFilter) => !prevIsFilter)}
              >
                <img src={isFilter ? caretDown : caretUp} alt="" />
              </button>
            </div>

            <div
              className={styles.searchDiv}
              style={isFilter ? { display: "none" } : { display: "flex" }}
            >
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
            <div
              className={styles.mainFilters}
              style={isFilter ? { display: "none" } : { display: "flex" }}
            >
              <div className={styles.mainCheckbox}>
                <h2>
                  Genres{" "}
                  <span id="selectedCount">({selectedCount} selected)</span>
                  <input
                    id="categoryCheckbox"
                    type="checkbox"
                    className={styles.smallCheckbox}
                    checked={isCategory}
                    onChange={(e) => handleMainCheck(e.target)}
                  />
                </h2>
                <div id="categoriesFilter" className={styles.mainCheckForm}>
                  {categories.map((category, index) => (
                    <EventFilterCheckbox
                      key={category.id}
                      id={`categoryCheckbox-${index}`}
                      value={category.id}
                      label={category.name}
                      handleCatCheck={handleCatCheck}
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
                    checked={isLocation}
                    onChange={(e) => handleMainCheck(e.target)}
                  />
                </h2>
                <div className={styles.locationInputs}>
                  <div className={styles.locationSearch}>
                    <img src={locationImage} alt="" />
                    <input
                      type="text"
                      name="location"
                      value={location}
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
                    checked={isDate}
                    onChange={(e) => handleMainCheck(e.target)}
                  />
                </h2>
                <div onClick={toggleDatePicker} className={styles.dateFields}>
                  <input
                    type="text"
                    placeholder="Start date"
                    value={
                      dateRange[0].startDate
                        ? dateRange[0].startDate.toLocaleDateString()
                        : ""
                    }
                    readOnly
                  />
                  <p> To </p>
                  <input
                    type="text"
                    placeholder="End date"
                    value={
                      dateRange[0].endDate
                        ? dateRange[0].endDate.toLocaleDateString()
                        : ""
                    }
                    readOnly
                  />
                  {showDatePicker && (
                    <DateRangePicker
                      onChange={(item) => setDateRange([item.selection])}
                      className={styles.rdrDateRangePickerWrapper}
                      months={isMobile ? 1 : 2}
                      direction={isMobile ? "horizontal" : "horizontal"}
                      ranges={dateRange}
                      editableDateInputs={true}
                      showMonthAndYearPickers={true}
                      showMonthArrow={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EventFilter.propTypes = {
  setSearchKeywords: PropTypes.func.isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setLocationMiles: PropTypes.func.isRequired,
  setDateParameter: PropTypes.func.isRequired,
  dateParameter: PropTypes.string,
};

export default EventFilter;
