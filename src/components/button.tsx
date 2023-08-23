import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  id?: string;
  isSecondary?: boolean;
  icon?: IconProp;
  children: string;
  onClick: () => void;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  id,
  isSecondary,
  icon,
  children,
  onClick,
}) => {
  const primaryButton = "bg-[#049281] text-white";
  const secondaryButton =
    "bg-transparent text-[#7A7A7A] border border-[#7A7A7A]";
  const iconButton = "text-[#049281] bg-transparent";

  const buttonClass = icon
    ? iconButton
    : isSecondary
    ? secondaryButton
    : primaryButton;

  return (
    <>
      <button
        id={id}
        onClick={onClick}
        className={`${buttonClass} rounded-lg px-3`}
      >
        {icon && (
          <FontAwesomeIcon
            size="lg"
            className="ml-2 w-6 cursor-pointer"
            icon={icon}
          />
        )}
        {children}
      </button>
    </>
  );
};
