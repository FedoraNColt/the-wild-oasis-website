import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../types";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

interface PageProps {
  cabin: Cabin;
}

async function Reservation({ cabin }: PageProps) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 max-h-[400px]">
      <DateSelector
        cabin={cabin}
        bookedDates={bookedDates}
        settings={settings}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
