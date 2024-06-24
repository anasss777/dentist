import { useLocale } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { svgKsa, svgUk } from "../svgPaths";

export const locales = ["ar", "en"];
const { Link, usePathname } = createSharedPathnamesNavigation({ locales });

function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="group relative hidden lg:block">
      {locale === "ar" ? (
        <Link
          href={pathname}
          locale="en"
          className="lg:contrast-[95%] hover:contrast-125"
        >
          {svgUk}
        </Link>
      ) : (
        <Link
          href={pathname}
          locale="ar"
          className="lg:contrast-[95%] hover:contrast-125"
        >
          {svgKsa}
        </Link>
      )}
    </div>
  );
}

export default LocaleSwitcher;
