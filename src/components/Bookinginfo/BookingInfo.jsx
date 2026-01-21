import BookingFuture from "./BookingFuture/BookingFuture";
import BookingHistory from "./BookingHistory/BookingHistory";
import "./bookinginfo.css";

export default function BookingInfo() {
  return (
    <>
      <div className="bookinginfo-title">
        <h2>Kommande Besök</h2>
      </div>
      <BookingFuture />
      <div className="bookinginfo-title">
        <h2>Tidigare Besök</h2>
      </div>
      <BookingHistory />
    </>
  );
}
