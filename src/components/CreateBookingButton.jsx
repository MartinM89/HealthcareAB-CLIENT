import { useNavigate } from "react-router-dom";

export default function CreateBookingButton() {
  const navigate = useNavigate();

  const handleCreateBooking = () => {
    navigate("/user/create-booking", { replace: true });
  };

  return (
    <>
      <button className="button" onClick={handleCreateBooking}>
        Create Booking
      </button>
    </>
  );
}
