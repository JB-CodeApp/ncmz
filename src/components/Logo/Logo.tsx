"use client";

import React from "react";
import LogoSvg from "./LogoSvg";
import Link from "next/link";
import { useThemeMode } from "@/hooks/useThemeMode";
import Image from "next/image";

export interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  const { isDarkMode } = useThemeMode();
  
  const logoSrc = isDarkMode
    ? "/assets/images/logo/logo-white.png"
    : "/assets/images/logo/logo-black.png";
  return (
    <Link
      href="/"
      className="ttnc-logo inline-block text-primary-6000 flex-shrink-0"
    >
       <Image
          alt={isDarkMode ? "Logo White" : "Logo Black"}
          src={logoSrc}
          height={100}
          width={100}
        />
    </Link>
  );
};

export default Logo;
