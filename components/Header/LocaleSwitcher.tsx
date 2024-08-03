import { useLocale } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import {
  svgKsa,
  svgLocale,
  svgLocaleBlue,
  svgTurkey,
  svgUk,
} from "../svgPaths";

type Props = {
  onAdmin?: boolean;
};

export const locales = ["ar", "en"];
const { Link, usePathname } = createSharedPathnamesNavigation({ locales });

function LocaleSwitcher({ onAdmin }: Props) {
  const pathname = usePathname();
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`group relative hidden lg:block lg:hover:contrast-[110%] contrast-[95%] py-1 ${
        locale === "ar" && "rtl"
      }`}
    >
      {onAdmin ? svgLocaleBlue : svgLocale}
      <div
        className={`border border-primary relative hidden w-[125px] rounded-md bg-white py-2 duration-300 group-hover:opacity-100
          lg:invisible lg:absolute lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible dark:bg-gray-800 ${
            locale === "ar" ? "left-0" : "right-0"
          } ${
          onAdmin
            ? "bottom-full transition-[bottom] lg:bottom-[110%] lg:group-hover:bottom-full"
            : "top-full transition-[top] lg:top-[110%] lg:group-hover:top-full"
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
