import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ cabinId: number }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  const { name } = cabin;
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const ids = (await getCabins()).map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

export default async function Page({ params }: PageProps) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve Cabin #{cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
