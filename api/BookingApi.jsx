export async function fetchBookings() {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}booking/mybookings`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Kunde inte hämta bokningar.");
  return await res.json();
}

export async function fetchCancelBooking(bookingId) {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}booking/cancel/${bookingId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Kunde inte avboka bokningen.");
  return await res.json();
}
