import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: string;
  onClick?: () => void;
};

const NavLink: React.FunctionComponent<Props> = ({
  href,
  children,
  onClick,
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`pt-1 text-lg ${
        pathname === href ? "text-primary" : "primary-dark"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
export default NavLink;
