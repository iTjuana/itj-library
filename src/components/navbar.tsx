import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
  { name: "Manage", href: "/manage" },
  { name: "Account", href: "/account" },
];

const Navbar: React.FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="justify-content group flex flex-col items-start gap-4  sm:flex-row sm:gap-16">
        <Link
          href="#"
          className={pathname == "/" ? "text-primary" : "primary-dark"}
        ></Link>
        <Link
          href="#"
          className={pathname == "/" ? "text-primary" : "primary-dark"}
        >
          Catalog
        </Link>
        <Link
          href="#"
          className={pathname == "/manage" ? "text-primary" : "primary-dark"}
        >
          Manage
        </Link>
        <Link
          href="#"
          className={pathname == "/account" ? "text-primary" : "primary-dark"}
        >
          Account
        </Link>
      </nav>
    </>
  );
};
export default Navbar;
