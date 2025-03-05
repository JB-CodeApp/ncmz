import React from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcLink from "@/components/NcLink/NcLink";
import Heading2 from "@/components/Heading/Heading2";
import Image from "next/image";
import LoginForm from "./LoginForm";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin = ({ }) => {
  return (
    <>
      <div className={`nc-LayoutPage relative`}>
        <div
          className={`absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40`}
        />
        <div className="container relative pt-6 sm:pt-10 pb-16 lg:pt-20 lg:pb-28">
          {/* CONTENT */}
          <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">

            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20 ">
              <Heading2>Login</Heading2>
              {/* <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                Welcome to our blog magazine Community
              </span> */}
            </header>

            <div className="max-w-md mx-auto space-y-6">
              <LoginForm />
              {/* <div className="grid gap-3">
                {loginSocials.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                  >
                    <Image
                      className="flex-shrink-0"
                      src={item.icon}
                      alt={item.name}
                    />
                    <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                      {item.name}
                    </h3>
                  </a>
                ))}
              </div>
              <div className="relative text-center">
                <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                  OR
                </span>
                <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
              </div>
              <form className="grid grid-cols-1 gap-6" action="#" method="post">
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Email address
                  </span>
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                    Password
                    <NcLink href="/forgot-pass" className="text-sm underline">
                      Forgot password?
                    </NcLink>
                  </span>
                  <Input type="password" className="mt-1" />
                </label>
                <ButtonPrimary type="submit">Continue</ButtonPrimary>
              </form>

              <span className="block text-center text-neutral-700 dark:text-neutral-300">
                New user? {` `}
                <NcLink href="/signup">Create an account</NcLink>
              </span> */}
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export default PageLogin;
