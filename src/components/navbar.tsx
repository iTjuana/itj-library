import React from "react";
import NavLink from "./navlink";
import { Role } from "utils/enum";
import { useSession } from "next-auth/react";

type Props = {
  isOpen: boolean;
  setIsOpen?: (boolean: boolean) => void;
};

const Navbar = ({ isOpen, setIsOpen }: Props) => {
  const { data: session, status } = useSession();

  const pages = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/catalog" },
    { name: "Account", href: "/account" },
  ];

  if (session?.user.role === Role.Admin) {
    pages.push({ name: "Manage", href: "/manage" });
  }

  return (
    <>
      <nav
        className={` flex w-full	transform flex-col justify-end gap-4 overflow-hidden bg-white pl-2  pr-64 pt-6 transition-all duration-1000 md:relative md:relative md:top-0 md:top-0 md:transform-none md:flex-row md:items-start md:gap-16 md:p-0 md:shadow-none  
        ${isOpen ? "pb-4  md:h-auto" : "hidden md:flex "}
           `}
      >
        {pages.map((page) => (
          <NavLink href={page.href} key={page.name}>
            {page.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
};
export default Navbar;
