import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Image, { StaticImageData } from "next/image";
import React, { FC, ReactNode } from "react";

export interface SectionHeroProps {
  className?: string;
  rightImg: string | StaticImageData;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
}) => {
  return (
    <div className={`nc-SectionHero relative ${className}`}>
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 rtl:space-x-reverse items-center relative text-center lg:text-left">
        <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
          <h1 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            {heading}
          </h1>
          <h2 className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
            {subHeading}
          </h2>
          {!!btnText && <ButtonPrimary href={"/contact/" as any}>{btnText}</ButtonPrimary>}
        </div>
        <div className="flex-grow">
          <Image className="w-full" src={rightImg} alt=""
            width={728}
            height={320} />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
