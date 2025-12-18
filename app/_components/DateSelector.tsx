"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Cabin, Settings } from "../types";
import useReservationContext, {
  ReservationContextType,
} from "../_contexts/ReservationContext";

function isAlreadyBooked(
  range: DateRange | undefined,
  datesArr: Date[]
): boolean {
  if (!range?.from || !range?.to) return false;

  const start = range.from;
  const end = range.to;

  return datesArr.some((date) => isWithinInterval(date, { start, end }));
}

interface DateSelectorProps {
  cabin: Cabin;
  bookedDates: Date[];
  settings: Settings;
}
function DateSelector({ cabin, bookedDates, settings }: DateSelectorProps) {
  // CHANGE
  const { range, setRange, resetRange } =
    useReservationContext() as ReservationContextType;
  const { regularPrice, discount } = cabin;
  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;
  const numNights =
    displayRange?.from && displayRange?.to
      ? Math.max(1, differenceInDays(displayRange.to, displayRange.from))
      : 0;
  const cabinPrice = (regularPrice - discount) * numNights;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        navLayout="around"
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        selected={displayRange}
        onSelect={setRange}
        startMonth={new Date()}
        hidden={{ before: new Date() }}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {(range?.from || range?.to) && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
