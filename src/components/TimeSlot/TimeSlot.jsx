import { useState } from "react";
import "./TimeSlot.css";

export default function TimeSlot({ props }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    props.setTimeSlotId(props.ts.id);
    props.setScheduleId(props.ts.scheduleId);
  };

  return (
    <button className={`${isActive ? " activeTimeSlot" : ""} btn`} onClick={() => handleClick()} disabled={!props.ts.isAvailable}>
      <span>{props.ts.start}</span>
      <span>-</span>
      <span>{props.ts.end}</span>
    </button>
  );
}
