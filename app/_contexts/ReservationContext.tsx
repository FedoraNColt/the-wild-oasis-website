"use client";

import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

export type ReservationContextType = {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextType | null>(null);

function ReservationContextProvider(props: { children: React.ReactNode }) {
  const initialRange = {
    from: undefined,
    to: undefined,
  };
  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  const resetRange = () => {
    setRange(initialRange);
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {props.children}
    </ReservationContext.Provider>
  );
}

const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context)
    throw new Error(
      "Reservation context was used outside reservation provider"
    );
  return context;
};

export { useReservationContext as default, ReservationContextProvider };
