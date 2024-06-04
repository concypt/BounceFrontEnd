import { useState } from "react";
import EventFilter from "../components/EventFilter";
import EventList from "../components/EventList";

function Events() {
  //filters
  const [searchKeywords, setSearchKeywords] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [location, setLocation] = useState("");
  const [locationMiles, setLocationMiles] = useState(40);
  const [dateParameter, setDateParameter] = useState("");

  return (
    <>
      <EventFilter
        setSearchKeywords={setSearchKeywords}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
        setLocation={setLocation}
        location={location}
        setLocationMiles={setLocationMiles}
        locationMiles={locationMiles}
        setDateParameter={setDateParameter}
        dateParameter={dateParameter}
      />
      <EventList
        searchKeywords={searchKeywords}
        selectedCategories={selectedCategories}
        location={location}
        locationMiles={locationMiles}
        dateParameter={dateParameter}
        setSearchKeywords={setSearchKeywords}
        setSelectedCategories={setSelectedCategories}
        setLocation={setLocation}
        setDateParameter={setDateParameter}
      />
    </>
  );
}

export default Events;
