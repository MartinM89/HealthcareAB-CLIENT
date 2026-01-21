import { useState, useEffect } from "react";
import "./BookingHistory.css";
import "../../Bookinginfo/bookinginfo.css";
import { fetchBookings } from "../../../../api/BookingApi";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function getBookings() {
      const data = await fetchBookings();
      setBookings(data.past);
    }
    getBookings();
  }, []);

  return bookings.length > 0 ? (
    bookings.map((booking) => (
      <div className="bookinginfo-container" key={booking.id}>
        <div className="bookinginfo-content">
          <div className="bookinginfo-content__date .flex-column">
            <p>{booking.date}</p>
          </div>
          <div className="bookinginfo-content__description .flex-column">
            <i className="bi bi-clock"></i>
            <span>
              {booking.start} - {booking.end}
            </span>
            <br />
            <i className="bi bi-person-circle"></i>
            <span>Nisse Nissesson</span>
          </div>
          <div className="bookinginfo-content__changes .flex-column">
            <div className="bookinginfo-content__department">
              <p> Mag och tarm</p>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>Frisk som en nötkärna, inga besök har gjorts än.</p>
  );
}
