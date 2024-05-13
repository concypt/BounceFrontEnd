import { useParams } from "react-router-dom";
import SingleEvent from "../components/SingleEvent";

const EventDetail = () => {
  const { eventId } = useParams();

  return (
    <>
      <SingleEvent eventId={eventId} />
    </>
  );
};

export default EventDetail;
