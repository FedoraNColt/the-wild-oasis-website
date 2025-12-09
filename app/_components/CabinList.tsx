import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";

async function CabinList({ filter }: { filter: string }) {
  const cabins = await getCabins();
  if (cabins.length === 0) return null;

  let filteredCabins = cabins;

  if (filter === "all") filteredCabins = cabins;
  if (filter === "sm")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "md")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );

  if (filter === "lg")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
