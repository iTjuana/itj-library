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

  return (
    <>
      <FilterSelect
        label="Availability"
        value={filters.status}
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
        setValue={(arg0: number) => setFilters({ ...filters, format: arg0 })}
        items={FormatOptions}
      />
      <FilterSelect
        label="Language"
        value={filters.language}
        setValue={(arg0: number) => setFilters({ ...filters, language: arg0 })}
        items={LanguageOptions}
      />
      <Input
        placeholder="Search for a book..."
        className="w-40"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
    </>
  );
};