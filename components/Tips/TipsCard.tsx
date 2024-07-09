import Image from "next/image";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale } from "next-intl";
import { Timestamp } from "firebase/firestore";
import { svgClock } from "../svgPaths";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  title: string;
  imageSrc: string;
  tipId: string;
  createdAt: Timestamp;
};

const TipsCard = ({ title, imageSrc, tipId, createdAt }: Props) => {
  const locale = useLocale();

  return (
    <Link
      locale={locale}
      href={`/tips/${tipId}`}
      className={`flex flex-col gap-2 justify-start items-start rounded-xl w-full pb-5 hover:scale-[1.01] transition-all duration-300
      ease-linear mx-auto h-fit md:h-[270px] my-3 bg-gradient-to-t from-transparent via-primary/30 to-primary/70`}
    >
      {/* Tip Image */}
      <div className={`w-full h-40 min-[500px]:h-60 md:h-40 p-2`}>
        <Image
          src={imageSrc ? imageSrc : "/images/testing.png"}
          alt={title}
          height={600}
          width={600}
          className="object-cover h-full rounded-xl"
        />
      </div>

      <p
        className={`text-gray-400 text-sm px-4 flex flex-row gap-[2px] items-center`}
      >
        {createdAt.toDate().toLocaleDateString()}
        <span>{svgClock}</span>
      </p>

      {/* Tip title */}
      <p
        className={`text-primary font-bold text-xl w-fit hover:text-primary/70 px-4`}
      >
        {title}
      </p>
    </Link>
  );
};

export default TipsCard;
