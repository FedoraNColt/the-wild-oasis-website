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
  guestId: number;
  cabinId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: status;
  created_at: string;
  observations?: string;
  hasBreakfast?: boolean;
  extrasPrice?: number;
  cabinPrice?: number;
  isPaid?: boolean;
  cabin: Cabin;
};

export type Country = {
  name: string;
  flag: string;
};

export type Guest = {
  id: number;
  fullName: string;
  email: string;
  nationality: string;
  countryFlag: string;
  nationalID: string;
  created_at: string;
};

export type NewGuest = Omit<Guest, "id" | "created_at">;

export type GuestUpdate = Partial<Omit<Guest, "id" | "created_at" | "email">>;

export type NewBooking = {
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status?: status;
  hasBreakfast?: boolean;
  observations?: string;
  extrasPrice?: number;
  cabinPrice?: number;
  isPaid?: boolean;
  cabinId: number;
  guestId: number;
};

export type BookingUpdate = Partial<NewBooking>;

export type Settings = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};
