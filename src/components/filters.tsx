import { useEffect, useState } from "react";
import { Format, Language, Status, enumObjToFilterItem } from "utils/enum";
import { type FilterItemInterface, FilterSelect } from "./filterSelect";
import { Input } from "@mui/material";

const availabilityOptions: FilterItemInterface[] = enumObjToFilterItem(Status);
const FormatOptions: FilterItemInterface[] = enumObjToFilterItem(Format);
const LanguageOptions: FilterItemInterface[] = enumObjToFilterItem(Language);

interface FiltersInterface {
  limit?: number;
  status?: number;
  format?: number;
  language?: number;
  search?: string;
  page: number;
}

interface FiltersProps {
  filters: FiltersInterface;
  setFilters: (arg0: FiltersInterface) => void;
}

export const Filters = (props: FiltersProps) => {
  const { filters, setFilters } = props;

  const [search, setSearch] = useState<string>("");

  const inputsClassName = "w-full md:w-40 sm:w-full";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({ ...filters, search });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search, filters, setFilters]);

  return (
    <div className="flex w-full flex-col justify-center gap-3 sm:flex-col md:flex-row">
      <FilterSelect
        label="Availability"
        value={filters.status}
        className={inputsClassName}
        setValue={(arg0: number) =>
          setFilters({
            ...filters,
            status: arg0,
          })
        }
        items={availabilityOptions}
      />

      <FilterSelect
        label="Format"
        value={filters.format}
        className={inputsClassName}
        setValue={(arg0: number) => setFilters({ ...filters, format: arg0 })}
        items={FormatOptions}
      />
      <FilterSelect
        label="Language"
        value={filters.language}
        className={inputsClassName}
        setValue={(arg0: number) => setFilters({ ...filters, language: arg0 })}
        items={LanguageOptions}
      />
      <Input
        placeholder="Search for a book..."
        className={inputsClassName}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};
