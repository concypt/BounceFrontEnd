import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DateTimePicker = ({ initialData, onDateTimeChange }) => {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (initialData.startDate) {
      setStartDate(initialData.startDate);
    } else {
      setStartDate(today);
    }

    if (initialData.startTime) {
      setStartTime(initialData.startTime);
    }

    if (initialData.endDate) {
      setEndDate(initialData.endDate);
    }

    if (initialData.endTime) {
      setEndTime(initialData.endTime);
    }
  }, [initialData]);

  useEffect(() => {
    const formattedStartDateTime = `${startDate} ${startTime}:00`;
    const formattedEndDateTime =
      endDate && endTime ? `${endDate} ${endTime}:00` : "";

    onDateTimeChange({
      startDate: formattedStartDateTime,
      endDate: formattedEndDateTime,
    });
  }, [startDate, startTime, endDate, endTime, onDateTimeChange]);

  return (
    <div className="datetime">
      <div className="datePicker">
        <label className="fieldlabels">Start date</label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label className="fieldlabels">End date</label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="chooseTime">
        <label className="fieldlabels">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label className="fieldlabels">End Time</label>
        <input
          type="time"
          name="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
    </div>
  );
};

DateTimePicker.propTypes = {
  initialData: PropTypes.shape({
    startDate: PropTypes.string,
    startTime: PropTypes.string,
    endDate: PropTypes.string,
    endTime: PropTypes.string,
  }),
  onDateTimeChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
