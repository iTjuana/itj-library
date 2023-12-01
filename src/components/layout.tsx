import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

// todo: check if this is the best way - https://nextjs.org/docs/basic-features/layouts

type Props = {
  title?: string;
  description?: string;
  children: React.ReactElement;
};

const Layout: React.FunctionComponent<Props> = ({
  title,
  description,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title ? title : "iTj Library"}</title>
        <meta
          name="description"
          content={description ? description : "Created by Rubber Ducks"}
        />
        <link rel="icon" href="/itj_logo_w.ico" />
      </Head>
      <div className="flex h-screen w-full flex-col">
        <header className="flex w-full flex-col items-center bg-white px-8 py-6 drop-shadow-lg sm:px-5 md:flex-row md:px-32">
          <div className="flex w-full items-center justify-between">
            <Link href="/">
              <Image src="/itj_library.svg" alt="itj" width="100" height="32" />
            </Link>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="h7 absolutei right-8 top-6 w-7 cursor-pointer  md:hidden"
            >
              {isOpen ? (
                <FontAwesomeIcon icon={faX} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </div>
          </div>

          <Navbar isOpen={isOpen} onChangeRoute={() => setIsOpen(false)} />
        </header>

        <div className="grow">{children}</div>

        <footer className="flex w-full items-center justify-center gap-2.5 border-t border-[#D4D9E2] bg-white py-4">
          <Image src="/itj_library.svg" alt="itj" width="100" height="32" />
          <p className="text-[#6D6E71]">
            © All rights reserved. Copyright 2023. Powered by iTjuana |
          </p>
          <Link className="text-primary no-underline" href="/privacy-policy">
            <p className="font-bold">Privacy Policy</p>
          </Link>
        </footer>
      </div>
    </>
  );
};

export default Layout;
