/* eslint-disable @next/next/no-page-custom-font */
import { useTranslations } from "next-intl";

export default function Head() {
  const t = useTranslations("head");

  return (
    <head>
      <title>{t("title")}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={t("description")} />
      <link rel="icon" href="/images/icon-logo.ico" sizes="any" as="image" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Marhey:wght@300..700&family=Noto+Kufi+Arabic:wght@100..900&display=swap"
        rel="stylesheet"
      />
    </head>
  );
}
