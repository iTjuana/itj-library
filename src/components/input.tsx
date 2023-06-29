interface InputProps {
  id: string;
  name: string;
  placeholder?: string;
}

export const Input: React.FunctionComponent<InputProps> = ({
  name,
  id,
  placeholder,
}) => {
  return (
    <>
      <input
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        className="rounded-full border border-[#EDEEF0] bg-[#FDFDFD] px-5 text-orange-950 drop-shadow"
      />
    </>
  );
};
