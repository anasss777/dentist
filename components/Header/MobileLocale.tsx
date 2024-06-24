import { svgKsa, svgUk } from "../svgPaths";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
const { Link, usePathname } = createSharedPathnamesNavigation({ locales });

const MobileLocale = () => {
  const pathname = usePathname();
  return (
    <div className={`flex flex-row gap-2`}>
      {" "}
      <Link href={pathname} locale="en">
        {svgUk}
      </Link>
      <Link href={pathname} locale="ar">
        {svgKsa}
      </Link>
    </div>
  );
};

export default MobileLocale;
