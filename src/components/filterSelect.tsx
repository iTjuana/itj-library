import { MenuItem, TextField } from "@mui/material";
import { type ReactElement } from "react";

interface FilterItem {
  value: number;
  name: string;
}

interface FilterSelectProps {
  label: string;
  value: number | undefined;
  setValue: (arg0: number) => void;
  items?: FilterItem[];
  children?: ReactElement;
}

export interface FilterItemInterface {
  value: number;
  name: string;
}

export const FilterSelect = ({
  label,
  value,
  setValue,
  items,
  children,
}: FilterSelectProps) => {
  return (
    <>
      <TextField
        select
        label={label}
        className="w-40"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      >
        {items
          ? items?.map((item: FilterItem) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))
          : children}
      </TextField>
    </>
  );
};
