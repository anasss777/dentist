import "@/styles/globals.css";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { Noto_Kufi_Arabic } from "next/font/google";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Head from "../(site)/Head";
import { Providers } from "../(site)/Provider";
import Sidebar from "@/components/Admin/Sidebar";
import { ContextProvider } from "@/context/stateContext";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface RootLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function Layout({ children, params }: RootLayoutProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const locales = ["en", "ar", "tr"];
  const messages = useMessages();

  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale}>
      <Head />

      <body
        className={`${
          notoKufiArabic.className
        } dark:bg-gray-900 bg-gray-50 flex flex-row min-h-screen ${
          locale === "ar" && "rtl"
        }`}
      >
        <ContextProvider>
          <Providers>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Sidebar />
              <div className="flex-grow">{children}</div>
            </NextIntlClientProvider>
          </Providers>
        </ContextProvider>
      </body>
    </html>
  );
}
