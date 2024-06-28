"use client";

import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";
import NavbarElements from "./NavbarElements";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import ThemeSwitcher from "../Common/ThemeSwitcher";
import Account from "./Account";
import LocaleSwitcher from "./LocaleSwitcher";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Header = () => {
  const locale = useLocale();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 transition-all z-40 flex flex-row justify-between items-center w-full h-fit py-3 lg:py-0 px-2 md:px-10
      lg:px-20 bg-primary ${scrolling ? "bg-primary/90" : "bg-primary"}`}
    >
      <div className={`flex flex-row gap-5 justify-center items-center`}>
        <Link
          href="/"
          locale={locale}
          className={`flex flex-row justify-center items-center gap-1`}
        >
          <p
            className={`text-white text-xl bg-white/10 rounded-xl px-2 border-2 border-white`}
          >
            Demo
          </p>
        </Link>
      </div>

      <NavbarElements />

      <div className={`flex flex-row items-center gap-3`}>
        <div className={`hidden lg:block`}>
          <ThemeSwitcher />
        </div>
        <Account />
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default Header;
