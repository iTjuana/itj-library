import React from "react";
import NavLink from "./navlink";
import { useState } from "react";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "@mui/material/Modal";
import { type } from "os";

type Props = {
  isOpen: boolean;
  setIsOpen?: (boolean: boolean) => void;
};
const pages = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
  { name: "Manage", href: "/manage" },
  { name: "Account", href: "/account" },
];

const Navbar = ({ isOpen, setIsOpen }: Props) => {
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
