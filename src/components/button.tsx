interface ButtonProps {
  id?: string;
  isSecondary?: boolean;
  children: string;
  onClick: () => void;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  id,
  isSecondary,
  children,
  onClick,
}) => {
  const primaryButton = "bg-[#049281] text-white";
  const secondaryButton =
    "bg-transparent text-[#7A7A7A] border border-[#7A7A7A]";
  return (
    <>
      <button
        id={id}
        onClick={onClick}
        className={`${
          isSecondary ? secondaryButton : primaryButton
        } rounded-lg px-3`}
      >
        {children}
      </button>
    </>
  );
};
