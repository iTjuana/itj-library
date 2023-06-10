import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

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
  return (
    <>
      <Head>
        <title>{title ? title : "iTj Library"}</title>
        <meta
          name="description"
          content={description ? description : "Created by Rubber Ducks"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex h-[78px] w-full items-center justify-between bg-red-900 px-8  drop-shadow-lg sm:px-32">
        <Image src="/itj_library.svg" alt="itj" width="100" height="32" />
        {/* Place Navbar component here */}
      </header>
      {children}
      <footer className="flex w-full items-center justify-center gap-2.5 py-4">
        <Image src="/itj_library.svg" alt="itj" width="100" height="32" />
        <p>© All rights reserved. Copyright 2023. Powered by iTjuana |</p>
        <Link
          className="text-primary underline"
          href="https://app.micoach.io"
          target="_blank"
        >
          <p className=" font-bold">Privacy Policy</p>
        </Link>
      </footer>
    </>
  );
};

export default Layout;
