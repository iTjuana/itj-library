import React from "react";
import NavLink from "./navlink";

const pages = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
  { name: "Manage", href: "/manage" },
  { name: "Account", href: "/account" },
];

const Navbar = () => {
  return (
    <>
      <nav className="justify-content group flex flex-col items-start gap-4  sm:flex-row sm:gap-16">
        {pages.map((page) => (
          <NavLink href={page.href}>{page.name}</NavLink>
        ))}
      </nav>
    </>
  );
};
export default Navbar;
