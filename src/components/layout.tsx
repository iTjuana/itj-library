import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// todo: check if this is the best way - https://nextjs.org/docs/basic-features/layouts

type Props = {
  title: string;
  children: React.ReactElement;
};

const Layout: React.FunctionComponent<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Created by Rubber Ducks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full bg-[url('/books_plant.jpeg')] bg-cover bg-center sm:bg-none">
        <div className="flex h-40 w-full items-center justify-center bg-white/75">
          <Image src="/itj_logo.png" alt="itj" width="64" height="64" />
          <h1 className="text-5xl text-primary">Library</h1>
        </div>
      </header>
      {children}
      <footer>
        <div className="flex items-end gap-2">
          <Image src="/itj_logo.png" alt="itj" width="64" height="64" />
          <p>© 2023 ITJ USA, Inc. All Right Reserved.</p>
          <Link
            className="text-primary underline"
            href="https://app.micoach.io"
            target="_blank"
          >
            <p className=" font-bold">Privacy Policy</p>
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Layout;
