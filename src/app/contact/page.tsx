import React, { FC } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import SocialsList from "@/components/SocialsList/SocialsList";
import Textarea from "@/components/Textarea/Textarea";
import Heading2 from "@/components/Heading/Heading2";
import ContactCalForm from "@/components/MyComponents/CalButtonandForm/ContactCalForm";
import Link from "next/link";

const info = [
  // {
  //   title: "🗺 ADDRESS",
  //   desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  // },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  // {
  //   title: "☎ PHONE",
  //   desc: "000-123-456-7890",
  // },
];


const PageContact = ({ }) => {
  return (

    <div className="nc-LayoutPage relative">
      <div
        className="absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40"
      />
      <div className="container relative pt-6 sm:pt-10 pb-16 lg:pt-20 lg:pb-28">
        {/* CONTENT */}
        <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
          <div>
            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-28 ">
              <Heading2>Contact us</Heading2>
              <h2 className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                Drop us message and we will get back for you.
              </h2>
            </header>

            <div className="-grid -gap-8 -lg:grid-cols-2">
              <div>
                <ContactCalForm />
              </div>
              {/* <div className="max-w-sm space-y-6">
          {info.map((item, index) => (
            <div key={index}>
              <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                {item.title}
              </h3>
              <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          ))}
          <div>
            <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
              🌏 SOCIALS
            </h3>
            <SocialsList className="mt-2" />
          </div>
        </div> */}
              <div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>

              <div className="container mx-auto p-4 flex items-center justify-center">
                <section className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-x-10 w-full">

                  {/* Info section */}
                  <div className="space-y-6">
                    {/* {info.map((item, index) => ( */}
                    <div >
                      <a href="mailto:contact@bhumikaios.com" >
                        <span className="block mt-2 lg:text-3xl text-2xl  text-neutral-500 dark:text-neutral-400">
                          contact@bhumikaios.com
                        </span>
                      </a>
                    </div>
                    {/* ))} */}
                  </div>

                  {/* Vertical line - hidden on mobile */}
                  <div className="md:block hidden !border-l-2 !border-neutral-300 h-[100px] w-px">&nbsp;</div>

                  {/* Socials section */}
                  <div className="">
                    <ul className="footer__social-6 flex space-x-2 text-center justify-center pb-5 mt-4">
                      {/* LinkedIn */}
                      <li>
                        <Link href="https://www.linkedin.com/in/bhumika-ios/">
                          <i className="fab fa-linkedin text-blue-500 text-4xl cursor-pointer p-1" />
                        </Link>
                      </li>

                      {/* Instagram */}
                      <li>
                        <Link href="https://www.instagram.com/bhumika_ios/">
                          <i className="fab fa-instagram text-pink-600 text-4xl cursor-pointer p-1" />
                        </Link>
                      </li>

                      {/* X (formerly Twitter) */}
                      <li>
                        <Link href="https://x.com/bhumika_ios">
                          <i className="fab fa-x text-blue-500 text-4xl cursor-pointer p-1" />
                        </Link>
                      </li>

                      {/* Facebook */}
                      <li>
                        <Link href="https://www.facebook.com/bhumika_ios">
                          <i className="fab fa-facebook text-blue-600 text-4xl cursor-pointer p-1" />
                        </Link>
                      </li>

                      {/* YouTube */}
                      <li>
                        <Link href="https://www.youtube.com/@bhumika_ios">
                          <i className="fab fa-youtube text-red-600 text-4xl cursor-pointer p-1" />
                        </Link>
                      </li>

                      {/* Dribbble */}
                      <li>
                        <Link href="https://dribbble.com/bhumika_ios">
                          <i className="fab fa-dribbble text-pink-500 text-4xl cursor-pointer p-1" />
                        </Link>
                      </li>

                      {/* Behance */}
                      <li>
                        <Link href="https://www.behance.net/bhumika_ios">
                          <i className="fab fa-behance text-blue-500 text-4xl cursor-pointer p-1" />
                        </Link>
                      </li>

                      {/* Patreon */}
                      <li>
                        <Link href="https://www.patreon.com/c/bhumika_ios">
                          <i className="fab fa-patreon text-purple-700 text-4xl cursor-pointer p-1" />
                        </Link>
                      </li>

                    </ul>
                  </div>
                </section>
              </div>
              {/* <div>
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <Label>Full name</Label>

              <Input placeholder="Example Doe" type="text" className="mt-1" />
            </label>
            <label className="block">
              <Label>Email address</Label>

              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <Label>Message</Label>

              <Textarea className="mt-1" rows={6} />
            </label>
            <ButtonPrimary type="submit">Send Message</ButtonPrimary>
          </form>
        </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContact;
