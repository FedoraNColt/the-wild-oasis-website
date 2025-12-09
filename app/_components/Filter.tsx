"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterOptions = [
  { field: "All Cabins", value: "all" },
  { field: "1 - 3 guests", value: "sm" },
  { field: "4 - 7 guests", value: "md" },
  { field: "8 - 12 guests", value: "lg" },
];

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilterValue = searchParams?.get("capacity") ?? "all";

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", e.currentTarget.value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      {filterOptions.map((filter) => (
        <FilterButton
          filterField={filter.field}
          filterValue={filter.value}
          activeFilterValue={activeFilterValue}
          handleClick={handleClick}
          key={filter.value}
        />
      ))}
    </div>
  );
}

interface FilterButtonProps {
  filterField: string;
  filterValue: string;
  activeFilterValue: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function FilterButton({
  filterField,
  filterValue,
  activeFilterValue,
  handleClick,
}: FilterButtonProps) {
  return (
    <button
      className={`hover:bg-primary-700 px-5 py-2 ${
        activeFilterValue === filterValue
          ? "bg-primary-700 text-primary-50"
          : ""
      }`}
      onClick={handleClick}
      value={filterValue}
    >
      {filterField}
    </button>
  );
}

export default Filter;
