"use client";

import type { Booking } from "@/app/types";
import ReservationCard from "@/app/_components/ReservationCard";
import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/action";

interface ReservationListProps {
  bookings: Booking[];
}

function ReservationList({ bookings }: ReservationListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings: Booking[], bookingId: number) => {
      return curBookings.filter((booking) => booking.id != bookingId);
    }
  );

  const handleDelete = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  };
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
