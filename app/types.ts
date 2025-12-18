export type status = "unconfirmed" | "checked-in" | "checked-out";

export type CustomerProfile = {
  fullName: string;
  email: string;
  contryFlag: string;
  nationality: string;
  nationalID: string;
};

export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type Booking = {
  id: number;
  guestId?: number;
  cabinId: number;
  startDate: string | Date;
  endDate: string | Date;
  numNights: number;
  totalPrice: number;
  numGuests?: number;
  status: status;
  created_at: string;
  cabin?: Cabin;
  observations?: string;
  hasBreakfast?: boolean;
  extrasPrice?: number;
  cabinPrice?: number;
  isPaid?: boolean;
};

export type NewBooking = Omit<Booking, "id" | "created_at">;
export type BookingUpdate = Partial<NewBooking>;

export type Country = {
  name: string;
  flag: string;
};

export type Guest = {
  id: number;
  fullName: string;
  email: string;
  nationality: string | null;
  countryFlag: string | null;
  nationalID: string | null;
  created_at: string;
};

export type NewGuest = {
  email: string;
  fullName: string;
};

export type GuestUpdate = Partial<Omit<Guest, "id" | "created_at" | "email">>;

export type Settings = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};
