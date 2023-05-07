import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const LogIn: NextPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <Head>
        <title>Log in</title>
        <meta name="description" content="Created by Rubber Ducks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-screen grid-cols-1 items-center gap-0 bg-white md:grid-cols-2">
        <div className="flex h-screen flex-col">
          <div className="container flex h-max min-h-fit max-w-none  grow flex-col items-center justify-center bg-[#f5f5f5] px-4 py-16 ">
            <div className="flex h-40 w-full items-center justify-center">
              <Image src="/itj_logo.png" alt="itj" width="80" height="80" />
              <h1 className="text-6xl text-primary">Library</h1>
            </div>
            <h1 className="mb-8 text-5xl font-normal italic tracking-tight text-[#565656] md:text-[2.5rem]">
              Log In
            </h1>
            <h2 className="mb-4 text-[#A8A6A7]">Enter your miCoach account</h2>

            {/* Building forms with Next.js - https://nextjs.org/docs/guides/building-forms */}
            <form
              className="mb-8 flex flex-col items-center justify-center gap-3 px-8"
              action="/login"
              method="post"
            >
              <fieldset className="flex justify-center">
                <div className="">
                  <label
                    className="block text-sm text-[#565656]"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-72 border border-slate-400 bg-[#f5f5f5] p-2 outline-none duration-150 focus-within:border-primary"
                    type="text"
                    id="email"
                    name="email"
                  />
                </div>
              </fieldset>
              <fieldset className="flex justify-center">
                <div>
                  <label
                    className="block text-sm text-[#565656]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="flex w-72 items-stretch border border-slate-400 p-2 duration-150 focus-within:border-primary">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full bg-[#f5f5f5] outline-none"
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      <FontAwesomeIcon
                        size="lg"
                        className="ml-2 w-6 cursor-pointer"
                        icon={isPasswordVisible ? faEyeSlash : faEye}
                      />
                    </span>
                  </div>
                </div>
              </fieldset>

              <Link
                className="self-end text-end text-primary underline"
                href="https://id.micoach.io/auth/realms/iTjuana/login-actions/reset-credentials"
                target="_blank"
              >
                <p className=" font-bold">Forgot your password?</p>
              </Link>
              <button
                className="mt-7 w-40 rounded-3xl bg-primary py-2 text-lg font-light text-white hover:bg-primary-dark"
                type="submit"
              >
                Log in
              </button>
            </form>

            <div className="flex gap-2">
              <p>Don&#39;t have an account?</p>
              <Link
                className="text-primary underline"
                href="https://app.micoach.io"
                target="_blank"
              >
                <p className=" font-bold">Sign up</p>
              </Link>
            </div>
          </div>
          <section className="h-fit min-h-min w-full bg-[#25a5a1]/25 pb-8 pt-4">
            <div className="flex items-center justify-center pb-4">
              <hr className="w-1/5 border-t border-slate-300" />
              <p className="min-w-max px-8">Sign In with</p>
              <hr className="w-1/5 border-t border-slate-300" />
            </div>
            <div className="flex justify-center gap-5">
              <Image
                className="cursor-pointer"
                src="/google_icon.svg"
                alt="Google"
                width="32"
                height="32"
              />
              <Image
                className="cursor-pointer"
                src="/microsoft_icon.svg"
                alt="Microsoft"
                width="32"
                height="32"
              />
            </div>
          </section>
        </div>

        {/* Right Image (hidden for mobile) */}
        <div className="relative hidden h-full bg-[url('/books_plant_opt.png')] bg-cover bg-center md:block">
          <Image
            className="absolute bottom-5 right-5"
            src="/itjuana_logo_white.svg"
            alt="iTjuana"
            width={100}
            height={50}
          />
          <p className="absolute bottom-5 left-5 text-white">
            © 2022 All rights reserved.
          </p>
        </div>
      </main>
    </>
  );
};

export default LogIn;
