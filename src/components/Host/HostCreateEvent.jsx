import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  createEvent,
  getEvent,
  updateEvent,
  addPicturesToEvent,
  deletePicturesFromEvent,
} from "../../api/secureService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PropTypes from "prop-types";
import TagsInput from "../Host/TagsInput";
import Loader from "../utils/Loader";
import { CatContext } from "../../contexts/GlobalProvider";
import ImageUpload from "../ImageUpload";
import Swal from "sweetalert2";
import DateTimePicker from "./DateTimePicker";

// Define zod schema
const eventSchema = z.object({
  event_name: z.string().min(1, 'Event name is required"'),
  category_id: z.coerce.number(),
  tag: z.array(z.string()),
  featured: z.coerce.number().default(0),
  event_start_time: z.string().min(1, "Start time is required"),
  event_end_time: z.string().min(1, "End time is required"),
  event_type: z.enum(["offline", "online"]),
  address: z.string().optional(),
  lat: z.coerce.number().nullable(),
  lang: z.coerce.number().nullable(),
  radius: z.coerce.number().nullable(),
  link: z.string().optional().nullable(),
  event_description: z.string().min(1, "Description is required"),
  gallery: z.array(z.object({ file: z.any(), preview: z.string() })),
  status: z.coerce.number().default(0),
});

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
  const searchBoxRef = useRef(null);
  const [imagesToRemove, setImagesToRemove] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      event_name: "",
      category_id: 0,
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
      status: 0,
    },
  });

  const eventData = watch();
  const navigate = useNavigate();

  const {
    data: fetchedEvent,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["editEvent", eventId],
    queryFn: () => getEvent(eventId),
    enabled: !!eventId,
  });
  if(fetchedEvent===null){
    navigate(`/dashboard-event`);
    Swal.fire({
      icon: 'error',
      title: 'Unauthorized Access',
      text: 'You do not have permission to access this event.',
      confirmButtonText: 'Okay'
    });
  }

  useEffect(() => {
    if (fetchedEvent) {
      const gallery = fetchedEvent.gallery.map((url) => ({
        file: null,
        preview: url,
      }));

      const startDateTime = separateDateTime(fetchedEvent.start_time);
      const endDateTime = separateDateTime(fetchedEvent.end_time);

      setValue("event_name", fetchedEvent.name);
      setValue("category_id", fetchedEvent.category_id);
      setValue("tag", fetchedEvent.tags.split(",") || []);
      setValue("featured", fetchedEvent.featured);
      setValue("event_start_time", startDateTime);
      setValue("event_end_time", endDateTime);
      setValue("event_type", fetchedEvent.type);
      setValue("address", fetchedEvent.address || "");
      setValue("lat", fetchedEvent.lat);
      setValue("lang", fetchedEvent.lang);
      setValue("link", fetchedEvent.link);
      setValue("event_description", fetchedEvent.description);
      setValue("gallery", gallery);
      setValue("status", fetchedEvent.status);
    }
  }, [fetchedEvent, setValue]);

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
          setEventId(data.request.id);

          navigate(`/host-event/edit/${data.request.id}`);
        }
      );
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to create event: ${error.message}`, "error");
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (eventData) => updateEvent(eventData, eventId),
    mutationKey: ["updateEvent"],
    onSuccess: (data) => {
      const images = eventData.gallery;
      //check if we have a image file in gallery
      const isFile = (element) => element.file != null;
      if (images.some(isFile)) {
        console.log("file check true");
        addPicturesMutation.mutate({ images, eventId });
      } else if (imagesToRemove !== undefined && imagesToRemove.length > 0) {
        console.log("images to remove: ", imagesToRemove);
        deletePicturesMutation.mutate({ imagesToRemove, eventId });
      } else {
        Swal.fire("Success!", "Event updated successfully!", "success").then(
          () => {
            //setFormStep(2);
          }
        );
      }
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to update event: ${error.message}`, "error");
    },
  });

  const addPicturesMutation = useMutation({
    mutationFn: ({ images, eventId }) => addPicturesToEvent(images, eventId),
    mutationKey: ["addPictures"],
    onSuccess: (data) => {
      if (imagesToRemove !== undefined && imagesToRemove.length > 0) {
        deletePicturesMutation.mutate({ imagesToRemove, eventId });
      } else {
        Swal.fire("Success!", "Event updated successfully!", "success").then(
          () => {
            //setFormStep(2);
          }
        );
      }
    },
    onError: (error) => {
      Swal.fire("Error!", `Failed to add pictures: ${error.message}`, "error");
    },
  });

  const deletePicturesMutation = useMutation({
    mutationFn: ({ imagesToRemove, eventId }) =>
      deletePicturesFromEvent(imagesToRemove, eventId),
    mutationKey: ["deletePictures"],
    onSuccess: (data) => {
      Swal.fire("Success!", "Event updated successfully!", "success").then(
        () => {
          //setFormStep(2);
        }
      );
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        `Failed to delete pictures: ${error.message}`,
        "error"
      );
    },
  });
  const handleNextButton = () => {
    if (!eventId) {
      Swal.fire("Error!", `Please refresh your page and try again!`, "error");
      return;
    } else {
      navigate(`/host-event/${eventId}/tickets`);
    }
  };
  const handleDateTimeChange = useCallback(
    ({ startDate, endDate }) => {
      setValue("event_start_time", startDate);
      setValue("event_end_time", endDate);
    },
    [setValue]
  );

  const handleImagesChange = (gallery) => {
    setValue("gallery", gallery);
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      setValue("address", place.formatted_address);
      setValue("lat", place.geometry.location.lat());
      setValue("lang", place.geometry.location.lng());
    }
  };

  const onSubmit = (data) => {
    console.log("sumbit called!", console.log(data));
    if (eventId) {
      console.log("event id is present!");
      mutationUpdate.mutate(data);
    } else {
      mutation.mutate(data);
    }
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD277hXRfelcfvYnHrqhfV91ikyZpu_TYk",
    libraries,
  });

  if (loadError) return <div>Error loading location</div>;
  if (!isLoaded) return <div>Loading location</div>;
  if (categoriesLoading) return <Loader />;
  if (categoriesError) return <p>Error: {categoriesError.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors && console.log(errors)}
        <div className="form-card">
          <div className="row">
            <div className="create-event-form-header">
              <h2 className="fs-title">New Event</h2>
              <div className="eventLables status">
                <select
                  {...register("status")}
                  className="form-select form-select-lg"
                  aria-label=".form-select-lg example"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
                {errors.status && <p>{errors.status.message}</p>}
              </div>
            </div>
            <div>
              <ImageUpload
                gallery={eventData.gallery}
                onImagesChange={handleImagesChange}
                imagesToRemove={imagesToRemove}
                setImagesToRemove={setImagesToRemove}
              />
              {errors.gallery && (
                <span className="error-message">{errors.gallery.message}</span>
              )}
            </div>
          </div>
          <div className="eventFields">
            <div className="eventLables">
              <label className="fieldlabels">Event Name</label>
              <input
                type="text"
                {...register("event_name")}
                placeholder="Name"
              />
              {errors.event_name && <p>{errors.event_name.message}</p>}
            </div>
            <div className="eventLables">
              <label className="fieldlabels">Event Category</label>
              <select
                {...register("category_id")}
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && <p>{errors.category_id.message}</p>}
            </div>
          </div>
          <div className="eventLables">
            <label className="fieldlabels">Tags</label>
            <TagsInput
              tags={eventData.tag}
              onTagsChange={(tags) => setValue("tag", tags)}
            />
          </div>
          <DateTimePicker
            initialStartTime={eventData.event_start_time}
            initialEndTime={eventData.event_end_time}
            onDateTimeChange={handleDateTimeChange}
          />
          <div className="switch-container">
            <div
              className={`eventType ${
                eventData.event_type === "offline" ? "selected" : ""
              }`}
              onClick={() => setValue("event_type", "offline")}
            >
              Venue
            </div>
            <div
              className={`eventType ${
                eventData.event_type === "online" ? "selected" : ""
              }`}
              onClick={() => setValue("event_type", "online")}
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
                  onChange={(e) => setValue("address", e.target.value)}
                />
              </StandaloneSearchBox>
            </div>
          )}
          {eventData.event_type === "online" && (
            <div className="eventLables">
              <label className="fieldlabels">Event Link</label>
              <input type="text" {...register("link")} />
              {errors.link && <p>{errors.link.message}</p>}
            </div>
          )}
          <div className="eventLables">
            <textarea
              {...register("event_description")}
              placeholder="Description"
            ></textarea>
            {errors.event_description && (
              <p>{errors.event_description.message}</p>
            )}
          </div>
        </div>
        <div className="multistep-button-wrap">
          <button
            type="submit"
            name="next"
            className="next-create-event action-button"
            disabled={mutation.isLoading || mutationUpdate.isLoading}
          >
            <span>
              {mutation.isLoading || mutationUpdate.isLoading
                ? "Loading..."
                : eventId
                ? "Update event"
                : "Save event"}
            </span>
          </button>
          {eventId ? (
            <button
              type="button"
              name="next"
              className="next-create-event action-button"
              onClick={handleNextButton}
            >
              <span>Next</span>
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
      {(mutation.isLoading || mutationUpdate.isLoading) && <Loader />}
      {(mutation.isError || mutationUpdate.isError) && (
        <p className="error">Error saving event</p>
      )}
    </>
  );
};

HostCreateEvent.propTypes = {
  setFormStep: PropTypes.func.isRequired,
  setEventId: PropTypes.func.isRequired,
  eventId: PropTypes.number,
};

export default HostCreateEvent;
