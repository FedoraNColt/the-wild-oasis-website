import { NextRequest } from "next/server";
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cabinId: string }> }
) {
  const { cabinId } = await params;
  const cabinIdNumber = Number(cabinId);
  if (Number.isNaN(cabinIdNumber)) {
    return Response.json({ message: "Invalid cabin id" }, { status: 400 });
  }

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinIdNumber),
      getBookedDatesByCabinId(cabinIdNumber),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
