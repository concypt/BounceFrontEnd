import styled from "styled-components";

export const CustomDateRangePicker = styled.div`
  .rdrCalendarWrapper {
    .rdrDateDisplayWrapper {
      background-color: #7357ff;
    }
    .rdrMonthAndYearPickers select {
      color: #7357ff;
    }
    .rdrNextPrevButton i {
      border-color: #7357ff;
    }
    .rdrDayNumber span {
      color: #7357ff;
    }
    .rdrDayNumber span.rdrDayHovered,
    .rdrDayNumber span.rdrDayActive {
      background: #7357ff;
    }
    .rdrStartEdge,
    .rdrEndEdge,
    .rdrInRange {
      background: #7357ff;
    }
  }
`;
