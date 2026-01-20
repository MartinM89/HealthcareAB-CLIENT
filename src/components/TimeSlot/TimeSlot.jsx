import { useState } from "react";
import "./TimeSlot.css";

export default function TimeSlot({ props }) {
  const handleClick = () => {
    props.setTimeSlotId(props.ts.id);
    props.setScheduleId(props.ts.scheduleId);
  };

  return (
    <button
      className={`${props.ts.id === props.timeSlotId ? " activeTimeSlot" : ""} btn`}
      onClick={() => handleClick()}
      disabled={!props.ts.isAvailable}
    >
      <span>{props.ts.start}</span>
      <span>-</span>
      <span>{props.ts.end}</span>
    </button>
  );
}
