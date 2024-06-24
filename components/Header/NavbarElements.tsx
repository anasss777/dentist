"use client";

import firebase from "@/firebase";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Menu from "./Menu";
import ThemeSwitcher from "../Common/ThemeSwitcher";
import { handleSignOut } from "@/utils/auth";
import MobileLocale from "./MobileLocale";

const NavbarElements = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button
        id="navbarToggler"
        onClick={toggleMenu}
        className={`absolute block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden ${
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
        } w-full max-w-[250px] rounded-lg bg-white shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-1
        lg:shadow-none xl:px-6`}
      >
        <ul
          onClick={() => setMenuOpen(false)}
          className={`block lg:flex flex-row justify-between border rounded-lg border-primary bg-gray-100 dark:bg-gray-800
            lg:bg-transparent lg:w-[65vw] lg:border-none lg:dark:bg-transparent`}
        >
          <div
            className={`lg:hidden p-[6px] w-full h-fit rounded-t-md mx-auto flex justify-center bg-primary`}
          >
            <ThemeSwitcher />
          </div>

          <div
            className={`block lg:flex lg:flex-row lg:justify-between lg:w-full ${
              locale === "ar" ? "text-right pr-3" : "text-left pl-3"
            }`}
          >
            <Menu text={t("about")} href="/about" />
            <Menu text={t("nav1")} href="/nav1" />
            <Menu text={t("nav2")} href="/nav2" />
            <Menu text={t("nav3")} href="/nav3" />
            <Menu text={t("contact")} href="/contact" />

            <div
              className={`w-full bg-gradient-to-r from-transparent via-primary to-transparent h-[0.5px] mt-3 lg:hidden`}
            ></div>

            {user ? (
              <div className="justify-center mb-1 mx-auto lg:hidden">
                <Menu text={t("profile")} href={`/${user.uid}`} />
                <Menu text={t("changePassword")} href="/change-password" />
                <button
                  className={`block rounded py-2 w-full font-extralight ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                  onClick={handleSignOut}
                >
                  {t("signOut")}
                </button>
              </div>
            ) : (
              <div className="justify-center mb-1 mx-auto lg:hidden">
                <Menu text={t("signIn")} href="/sign-in" />
                <Menu text={t("signUp")} href="/sign-up" />
              </div>
            )}
          </div>

          <div
            className={`w-full bg-gradient-to-r from-transparent via-primary to-transparent h-[0.5px] mb-3 lg:hidden`}
          ></div>

          <div
            className={`flex flex-row lg:hidden justify-center items-center w-full`}
          >
            <MobileLocale />
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarElements;
