export type Option = { text: string; value: string };

interface DropdownMenuProps {
  placeholder?: string;
  options: Option[];
}

export const DropdownMenu: React.FunctionComponent<DropdownMenuProps> = ({
  options,
  placeholder,
}) => {
  return (
    <>
      <select
        name="filter"
        id="filter_id"
        placeholder="ID, title..."
        className="rounded-full border border-[#EDEEF0] bg-[#FDFDFD] px-5 drop-shadow"
        defaultValue={placeholder ?? "Select your option"}
      >
        {/* <option value="" disabled selected>
          {placeholder ?? "Select your option"}
        </option> */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </>
  );
};
