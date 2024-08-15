import { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import locationImage from "../assets/images/location_grey.svg";
import styles from "./eventFilter.module.css";

const libraries = ["places"];

const LocationInput = ({ location, setLocation }) => {
  const [inputValue, setInputValue] = useState(location);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD277hXRfelcfvYnHrqhfV91ikyZpu_TYk",
    libraries,
  });

  const searchBoxRef = useRef(null);

  const handlePlaceChanged = useCallback(() => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    setLocation(place.formatted_address || "");
  }, [setLocation]);

  return isLoaded ? (
    <div className={styles.locationSearch}>
      <img src={locationImage} alt="" />
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Enter a location"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </StandaloneSearchBox>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

LocationInput.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default LocationInput;
