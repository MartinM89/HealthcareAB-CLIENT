import { useState, useEffect } from "react";
import "./BookingFuture.css";
import "../../Bookinginfo/bookinginfo.css";
import { fetchBookings, fetchCancelBooking } from "../../../../api/BookingApi";

export default function BookingFuture() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function getBookings() {
      const data = await fetchBookings();
      setBookings(data.upcoming);
    }
    getBookings();
  }, []);

  async function cancelBooking(bookingId) {
    try {
      await fetchCancelBooking(bookingId);
    } finally {
      const data = await fetchBookings();
      setBookings(data.upcoming);
    }
  }

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
              {booking.start.substring(0, 5)} - {booking.end.substring(0, 5)}
            </span>
            <br />
            <i className="bi bi-person-circle"></i>
            <span>Nisse Nissesson</span>
          </div>
          <div className="bookinginfo-content__changes .flex-column">
            <div className="bookinginfo-content__department">
              <p> Mag och tarm</p>
            </div>
            <div className="bookinginfo-content__selector">
              <button className="cancel" onClick={() => cancelBooking(booking.id)}>
                Avboka
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>Du har inga kommande besök.</p>
  );
}
