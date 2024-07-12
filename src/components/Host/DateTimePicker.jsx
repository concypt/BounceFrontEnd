import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DateTimePicker = ({
  initialStartTime,
  initialEndTime,
  onDateTimeChange,
}) => {
  const initialStart = new Date().toISOString().split("T")[0];
  let initialEnd = new Date();
  initialEnd.setDate(initialEnd.getDate() + 7);
  initialEnd = initialEnd.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(initialStart);
  const [startTime, setStartTime] = useState("00:00");
  const [endDate, setEndDate] = useState(initialEnd);
  const [endTime, setEndTime] = useState("00:00");

  // Initialize state based on props only once
  useEffect(() => {
    if (initialStartTime && initialEndTime) {
      const [startDate, startTime] = initialStartTime.split(" ");
      const [endDate, endTime] = initialEndTime.split(" ");

      // Check if the values are different before setting state
      setStartDate((prev) => (prev !== startDate ? startDate : prev));
      setStartTime((prev) => (prev !== startTime ? startTime : prev));
      setEndDate((prev) => (prev !== endDate ? endDate : prev));
      setEndTime((prev) => (prev !== endTime ? endTime : prev));
    }
  }, [initialStartTime, initialEndTime]);

  // Notify parent about changes
  useEffect(() => {
    const formattedStartDateTime = `${startDate} ${startTime}`;
    const formattedEndDateTime =
      endDate && endTime ? `${endDate} ${endTime}` : "";

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
  initialStartTime: PropTypes.string,
  initialEndTime: PropTypes.string,
  onDateTimeChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
