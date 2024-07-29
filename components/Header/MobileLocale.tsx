import { useLocale } from "next-intl";
import { svgKsa, svgTurkey, svgUk } from "../svgPaths";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
const { Link, usePathname } = createSharedPathnamesNavigation({ locales });

const MobileLocale = () => {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className={`flex flex-row gap-2`}>
      {/* Arabic Option */}
      <Link
        href={pathname}
        locale="ar"
        className={`${locale === "ar" && "hidden"}`}
      >
        {svgKsa}
      </Link>

      {/* English Option */}
      <Link
        href={pathname}
        locale="en"
        className={`${locale === "en" && "hidden"}`}
      >
        {svgUk}
      </Link>

      {/* Turkish Option */}
      {/* <Link
        href={pathname}
        locale="tr"
        className={`${locale === "tr" && "hidden"}`}
      >
        {svgTurkey}
      </Link> */}
    </div>
  );
};

export default MobileLocale;
