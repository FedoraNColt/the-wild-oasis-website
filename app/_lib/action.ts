"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBooking } from "./data-service";
import { redirect } from "next/navigation";
import { NewBooking } from "../types";

const normalizeToUtcDate = (value: string | Date) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
};

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email)
    throw new Error("You must be logged in to access this page.");

  const nationalID = formData.get("nationalID")?.toString().trim() ?? "";
  const [nationality = "", countryFlag = ""] =
    formData.get("nationality")?.toString()?.split("%") ?? [];

  const updateData: Record<string, string | null> = {};
  if (nationalID !== "") updateData.nationalID = nationalID;
  if (nationality !== "") updateData.nationality = nationality;
  if (countryFlag !== "") updateData.countryFlag = countryFlag;

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", Number(session.user.id));

  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session?.user?.email)
    throw new Error("You must be logged in to access this page.");

  const { guestId } = await getBooking(bookingId);
  if (guestId !== Number(session.user.id))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(
  reservationId: number,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id)
    throw new Error("You must be logged in to access this page.");
  const booking = await getBooking(reservationId);
  if (booking.guestId !== Number(session.user.id))
    throw new Error("You are not allowed to edit this reservation");

  const numGuests = Number(formData.get("numGuests"));
  const observations =
    formData.get("observations")?.toString().trim().slice(0, 1000) ?? "";
  const updateData: Record<string, string | number> = {};
  if (numGuests !== -1) updateData.numGuests = numGuests;
  updateData.observations = observations;

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", reservationId);

  if (error) {
    throw new Error("Reservation could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function createBooking(
  bookingData: NewBooking,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id)
    throw new Error("You must be logged in to access this page.");

  const guestId = Number(session.user.id);
  const numGuests = Number(formData.get("numGuests"));
  const observations =
    formData.get("observations")?.toString().trim().slice(0, 1000) ?? "";

  const normalizedStartDate = normalizeToUtcDate(bookingData.startDate);
  const normalizedEndDate = normalizeToUtcDate(bookingData.endDate);
  if (!normalizedStartDate || !normalizedEndDate)
    throw new Error("Reservation dates are invalid");

  const newBooking: NewBooking = {
    ...bookingData,
    startDate: normalizedStartDate,
    endDate: normalizedEndDate,
    guestId,
    numGuests,
    observations,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${newBooking.cabinId}`);
  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}

export async function SignInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function SignOutAction() {
  await signOut({ redirectTo: "/" });
}
