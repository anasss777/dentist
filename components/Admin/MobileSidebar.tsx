"use client";

import React, { useEffect, useState } from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale } from "next-intl";
import ThemeSwitcher from "../Common/ThemeSwitcher";
import MobileLocale from "../Header/MobileLocale";
import SidebarContent from "./SidebarContent";
export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const MobileSidebar = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

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
      className={`sticky top-0 transition-all z-40 flex flex-row justify-between items-center w-full h-fit py-3 px-2 bg-primary ${
        scrolling ? "bg-primary/90" : "bg-primary"
      }`}
    >
      <div className={`flex flex-row gap-5 justify-center items-center`}>
        <Link
          href="/admin"
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

      <div>
        <button
          id="navbarToggler"
          onClick={toggleMenu}
          className={`absolute block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 ${
            locale === "ar" ? "left-2" : "right-2"
          }`}
        >
          <span
            className={`relative my-[6px] block h-[2px] w-[30px] bg-white ${
              isMenuOpen && "top-[7px] rotate-45"
            }`}
          ></span>
          <span
            className={`relative my-[6px] block h-[2px] w-[30px] bg-white ${
              isMenuOpen && "opacity-0"
            }`}
          ></span>
          <span
            className={`relative my-[6px] block h-[2px] w-[30px] bg-white ${
              isMenuOpen && "top-[-8px] -rotate-45"
            }`}
          ></span>
        </button>

        <nav
          id="navbarCollapse"
          className={`absolute top-[58px] ${
            locale === "ar" ? "left-1 lg:pr-4" : "right-1 lg:pl-4"
          } ${
            isMenuOpen ? "block" : "hidden"
          } w-full max-w-[250px] rounded-lg bg-white shadow-lg`}
        >
          <ul
            onClick={() => setMenuOpen(false)}
            className={`block lg:flex flex-row justify-between border rounded-lg border-primary bg-gray-100 dark:bg-gray-800
            lg:bg-transparent lg:w-[65vw] lg:border-none lg:dark:bg-transparent h-[85vh] overflow-y-scroll`}
          >
            <div
              className={`flex flex-row justify-center items-center w-full gap-2 my-2`}
            >
              {/* Theme Switcher */}
              <span
                className={`p-[6px] w-fit h-fit rounded-full flex justify-center bg-primary/50`}
              >
                <ThemeSwitcher />
              </span>

              {/* Mobile locale switcher */}
              <MobileLocale />
            </div>

            <div className={`${isArabic ? "pr-3" : "pl-3"}`}>
              <SidebarContent />
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;
