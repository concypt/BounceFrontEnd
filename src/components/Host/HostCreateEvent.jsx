import { useState, useContext, useRef, useCallback, useEffect } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createEvent, getEvent, updateEvent } from "../../api/secureService";
import PropTypes from "prop-types";
import TagsInput from "../Host/TagsInput";
import Loader from "../utils/Loader";
import { CatContext } from "../../contexts/GlobalProvider";
import ImageUpload from "../ImageUpload";
import Swal from "sweetalert2";
import DateTimePicker from "./DateTimePicker";

function separateDateTime(datetimeString) {
  // Split the datetime string into date and time components
  const [date, timeWithMs] = datetimeString.split("T");
  // Remove the milliseconds and timezone part from the time component
  const time = timeWithMs.split(".")[0].slice(0, 5);

  const dateTime = date + " " + time;

  return dateTime;
}

const HostCreateEvent = ({ setFormStep, setEventId, eventId }) => {
  const [libraries] = useState(["places"]);
  const [eventData, setEventData] = useState({
    event_name: "",
    category_id: "",
    tag: [],
    featured: 0,
    event_start_time: "",
    event_end_time: "",
    event_type: "offline",
    address: "",
    lat: null,
    lang: null,
    radius: null,
    link: "",
    event_description: "",
    gallery: [],
    event_status: 0,
  });

  const {
    data: fectchedEvent,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["editEvent", eventId],
    queryFn: () => getEvent(eventId),
    enabled: !!eventId,
  });

  if (isLoading) console.log("loading event");
  if (isError) console.log(isError);
  //console.log(fectchedEvent);
  // useEffect(() => {
  //   console.log(eventData);
  // }, [eventData]);

  useEffect(() => {
    if (fectchedEvent) {
      const fGallery = fectchedEvent.gallery.map((url) => ({
        file: null,
        preview: url,
      }));

      const fStartDateTime = separateDateTime(fectchedEvent.start_time);

      const fEndDateTime = separateDateTime(fectchedEvent.end_time);

      setEventData({
        event_name: fectchedEvent.name,
        category_id: fectchedEvent.category_id,
        tag: fectchedEvent.tags.split(",") || [],
        featured: fectchedEvent.featured,
        event_start_time: fStartDateTime,
        event_end_time: fEndDateTime,
        event_type: fectchedEvent.type,
        address: fectchedEvent.address,
        lat: fectchedEvent.lat,
        lang: fectchedEvent.lang,
        radius: null,
        link: fectchedEvent.link,
        event_description: fectchedEvent.description,
        gallery: fGallery || [],
        event_status: fectchedEvent.event_status,
      });
    }
  }, [fectchedEvent]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchBoxRef = useRef(null);

  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useContext(CatContext);

  const mutation = useMutation({
    mutationFn: createEvent,
    mutationKey: ["createEvent"],
    onSuccess: (data) => {
      Swal.fire("Success!", "Event created successfully!", "success").then(
        () => {
          // After the user clicks "OK" on the popup, set the form step to 2
          //console.log(data);
          setEventId(data.request);
          setFormStep(2);
        }
      );
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to create event: ${error.message}`, "error");
      // Error actions
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (eventData) => updateEvent(eventData, eventId),
    mutationKey: ["updateEvent"],
    onSuccess: (data) => {
      Swal.fire("Success!", "Event updated successfully!", "success").then(
        () => {
          // After the user clicks "OK" on the popup, set the form step to 2
          console.log(data);

          setFormStep(2);
        }
      );
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to create event: ${error.message}`, "error");
      // Error actions
    },
  });

  const handleDateTimeChange = useCallback(({ startDate, endDate }) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      event_start_time: startDate,
      event_end_time: endDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleTagsChange = (tag) => {
    setEventData({ ...eventData, tag });
  };

  const handleImagesChange = (gallery) => {
    if (gallery && gallery.length > 0) {
      setEventData({ ...eventData, gallery });
    } else {
      // Handle empty gallery case ( send empty array )
      setEventData({ ...eventData, gallery: [] });
    }
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      setEventData({
        ...eventData,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lang: place.geometry.location.lng(),
      });
    }
  };

  // const handleNext = () => {
  //   //setFormStep(2);
  //   //console.log(eventData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    if (eventId != null || eventId != "") {
      console.log("submit::", eventId);
      mutationUpdate.mutate(eventData);
    } else {
      mutation.mutate(eventData);
    }
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD277hXRfelcfvYnHrqhfV91ikyZpu_TYk", // Replace with your actual Google Maps API key
    libraries,
  });

  if (loadError) return <div>Error loading location</div>;
  if (!isLoaded) return <div>Loading location</div>;

  if (categoriesLoading) {
    return <Loader />;
  }

  if (categoriesError) {
    return <p>Error: {categoriesError.message}</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-card">
          <div className="row">
            <div className="create-event-form-header">
              <h2 className="fs-title">New Event</h2>
              <div className="eventLables status">
                <select
                  name="event_status"
                  value={eventData.event_status}
                  onChange={handleChange}
                  className="form-select form-select-lg"
                  aria-label=".form-select-lg example"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <ImageUpload
                gallery={eventData.gallery}
                onImagesChange={handleImagesChange}
              />
            </div>
          </div>
          <div className="eventFields">
            <div className="eventLables">
              <label className="fieldlabels">Event Name</label>
              <input
                type="text"
                name="event_name"
                value={eventData.event_name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div className="eventLables">
              <label className="fieldlabels">Event Category</label>
              <select
                name="category_id"
                value={eventData.category_id}
                onChange={handleChange}
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="eventLables">
            <label className="fieldlabels">Tags</label>
            <TagsInput tags={eventData.tag} onTagsChange={handleTagsChange} />
          </div>
          <DateTimePicker
            initialStartTime={eventData.event_start_time}
            initialEndTime={eventData.event_end_time}
            onDateTimeChange={handleDateTimeChange}
          />
          {/* <EventDateTime eventData={eventData} setEventData={setEventData} /> */}
          <div className="switch-container">
            <div
              className={`eventType ${
                eventData.event_type === "offline" ? "selected" : ""
              }`}
              onClick={() =>
                setEventData({
                  ...eventData,
                  event_type: "offline",
                })
              }
            >
              Venue
            </div>
            <div
              className={`eventType ${
                eventData.event_type === "online" ? "selected" : ""
              }`}
              onClick={() =>
                setEventData({
                  ...eventData,
                  event_type: "online",
                })
              }
            >
              Online
            </div>
            <div
              className={`highlight ${eventData.event_type.toLowerCase()}`}
            ></div>
          </div>
          {eventData.event_type === "offline" && (
            <div className="eventLables">
              <label className="fieldlabels">Event Location</label>
              <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={onPlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Search for location"
                  value={eventData.address}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      address: e.target.value,
                    })
                  }
                />
              </StandaloneSearchBox>
            </div>
          )}
          {eventData.event_type === "online" && (
            <div className="eventLables">
              <label className="fieldlabels">Event Link</label>
              <input
                type="text"
                name="link"
                value={eventData.link}
                onChange={handleChange}
              />
            </div>
          )}
          {/* <div className="eventLables">
                            <label className="fieldlabels">
                              Radius (miles)
                            </label>
                            <input
                              type="number"
                              name="radius"
                              value={eventData.radius}
                              onChange={handleChange}
                            />
                          </div> */}
          <div className="eventLables">
            <textarea
              name="event_description"
              value={eventData.event_description}
              onChange={handleChange}
              placeholder="Description"
            ></textarea>
          </div>
        </div>

        <button
          name="next"
          className="next-create-event action-button"
          disabled={loading}
        >
          <span>Save Event</span>
        </button>
      </form>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
    </>
  );
};

HostCreateEvent.propTypes = {
  setFormStep: PropTypes.func,
  setEventId: PropTypes.func,
  eventId: PropTypes.number,
};
export default HostCreateEvent;
