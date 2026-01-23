import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import "./CreateBooking.css";
import TimeSlot from "../TimeSlot/TimeSlot";
import { useNavigate } from "react-router-dom";

export default function CreateBooking() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [value, setValue] = useState(new Date());
  const [timeSlotId, setTimeSlotId] = useState();
  const [scheduleId, setScheduleId] = useState();
  const [comment, setComment] = useState("");
  const dateStr = value.getFullYear() + "-" + String(value.getMonth() + 1).padStart(2, "0") + "-" + value.getDate();
  const minBookingDate = new Date();
  minBookingDate.setDate(minBookingDate.getDate() - 1);
  const maxBookingDate = new Date();
  maxBookingDate.setDate(maxBookingDate.getDate() + 30);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTimeSlots() {
      const result = await fetch(`${import.meta.env.VITE_BASE_URL}TimeSlot/available-timeslots?date=${dateStr}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await result.json();
      setTimeSlots(data);
    }
    fetchTimeSlots();

    setTimeSlotId(undefined);
    setScheduleId(undefined);
  }, [value]);

  const handleBack = () => {
    navigate("/user/dashboard");
  };

  const handleBooking = async () => {
    const timeSlot = timeSlots.find((ts) => ts?.["id"] === timeSlotId);
    const request = {
      comment: comment,
      start: timeSlot.start,
      date: dateStr,
      timeSlotId: timeSlotId,
      scheduleId: scheduleId,
    };

    const result = await fetch(`${import.meta.env.VITE_BASE_URL}Booking/create-booking`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    //* Confirm to user that their booking has been created using data
    const data = await result.json();

    setValue(new Date());
    setTimeSlotId(undefined);
    setScheduleId(undefined);
    setComment("");
  };

  return (
    <div className="create-booking-container">
      <button className="back-btn" onClick={handleBack}>
        Tillbaka
      </button>
      <h1 className="create-booking-container__title">BOKA TID</h1>
      {/* <select name="" id=""></select> */}
      <div className="create-booking-container__calender">
        <div className="calendar-wrapper">
          <Calendar onChange={setValue} value={value} locale="sv-SE" tileDisabled={({ date }) => date < minBookingDate || date > maxBookingDate} />
        </div>
      </div>
      <div className="create-booking-container__time-slots">
        {timeSlots.map((ts) => (
          <TimeSlot props={{ ts, value, setTimeSlotId, setScheduleId, timeSlotId }} />
        ))}
      </div>
      <textarea
        className="create-booking-container__text-area"
        name=""
        id=""
        placeholder="Lämna en kommentar"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button className="create-booking-container__create-btn" onClick={handleBooking}>
        Boka
      </button>
    </div>
  );
}
