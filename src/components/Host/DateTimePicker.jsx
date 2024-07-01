import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DateTimePicker = ({
  initialStartTime,
  initialEndTime,
  onDateTimeChange,
}) => {
  const inSD = initialStartTime.split(" ")[0] || "";
  const inST = initialStartTime.split(" ")[1] || "";
  const inED = initialEndTime.split(" ")[0] || "";
  const inET = initialEndTime.split(" ")[1] || "";

  const initialStart = new Date().toISOString().split("T")[0];
  let initialEnd = new Date();
  initialEnd.setDate(initialEnd.getDate() + 7);
  initialEnd = initialEnd.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(inSD != "" ? inSD : initialStart);
  const [startTime, setStartTime] = useState(inST != "" ? inST : "00:00");
  const [endDate, setEndDate] = useState(inED != "" ? inED : initialEnd);
  const [endTime, setEndTime] = useState(inET != "" ? inET : "00:00");

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
  initialStartTime: PropTypes.string,
  initialEndTime: PropTypes.string,
  onDateTimeChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
