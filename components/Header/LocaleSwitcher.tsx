import { useLocale } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { svgKsa, svgLocale, svgTurkey, svgUk } from "../svgPaths";

export const locales = ["ar", "en"];
const { Link, usePathname } = createSharedPathnamesNavigation({ locales });

function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`group relative hidden lg:block lg:hover:contrast-[110%] contrast-[95%] py-1 ${
        locale === "ar" && "rtl"
      }`}
    >
      {svgLocale}
      <div
        className={`border border-primary relative top-full hidden w-[125px] rounded-md bg-white py-2 transition-[top] duration-300
          group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible
          lg:group-hover:top-full dark:bg-gray-800 ${
            locale === "ar" ? "left-0" : "right-0"
          }`}
      >
        {/* Arabic Option */}
        <Link
          href={pathname}
          locale="ar"
          className={`lg:contrast-[95%] hover:contrast-125 rounded py-2 px-3 text-sm hover:opacity-50 w-full flex flex-row justify-center
            items-center gap-2 ${isArabic ? "text-right" : "text-left"} ${
            locale === "ar" && "hidden"
          }`}
        >
          <span>{svgKsa}</span>
          <p>العربية</p>
        </Link>

        {/* English Option */}
        <Link
          href={pathname}
          locale="en"
          className={`lg:contrast-[95%] hover:contrast-125 rounded py-2 px-3 text-sm hover:opacity-50 w-full flex flex-row justify-center
            items-center gap-2 ${isArabic ? "text-right" : "text-left"} ${
            locale === "en" && "hidden"
          }`}
        >
          <span>{svgUk}</span>
          <p>English</p>
        </Link>

        {/* Turkish Option */}
        {/* <Link
          href={pathname}
          locale="tr"
          className={`lg:contrast-[95%] hover:contrast-125 rounded py-2 px-3 text-sm hover:opacity-50 w-full flex flex-row justify-center
            items-center gap-2 ${isArabic ? "text-right" : "text-left"} ${
            locale === "tr" && "hidden"
          }`}
        >
          <span>{svgTurkey}</span>
          <p>Türkçe</p>
        </Link> */}
      </div>
    </div>
  );
}

export default LocaleSwitcher;
