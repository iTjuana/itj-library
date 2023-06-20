import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
  href: string;
  children: string;
};

const NavLink: React.FunctionComponent<Props> = ({
  className,
  href,
  children,
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={pathname === href ? "text-primary" : "primary-dark"}
    >
      {children}
    </Link>
  );
};
export default NavLink;
