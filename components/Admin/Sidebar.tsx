"use client";

import { useLocale } from "next-intl";
import ThemeSwitcher from "../Common/ThemeSwitcher";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import LocaleSwitcher from "../Header/LocaleSwitcher";
import SidebarContent from "./SidebarContent";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Sidebar = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`md:flex md:flex-col items-center justify-between w-1/5 h-screen sticky shadow-Card py-3 px-2 border-r dark:border-r-gray-600
      border-r-primary hidden bg-secondary/10 dark:bg-white/10 ${
        isArabic && "border-l dark:border-l-gray-600 border-l-primary"
      }`}
    >
      {/* Logo */}
      <Link
        href="/admin"
        locale={locale}
        className={`flex flex-row justify-center items-center gap-1 mb-2`}
      >
        <p
          className={`text-white text-xl bg-primary rounded-xl px-2 border-2 border-white shadow-Card`}
        >
          Demo
        </p>
      </Link>

      <SidebarContent />

      <div
        className={`flex flex-row justify-center items-center gap-2 w-full mt-2`}
      >
        {/* Locale switcher */}
        <LocaleSwitcher onAdmin />

        {/* Theme Switcher */}
        <span
          className={`p-[6px] w-fit h-fit rounded-full flex justify-center bg-primary/50`}
        >
          <ThemeSwitcher />
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
