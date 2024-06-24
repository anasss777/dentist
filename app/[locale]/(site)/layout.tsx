import { Cairo, Noto_Kufi_Arabic } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Head from "./Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./Provider";

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

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locales = ["en", "ar", "tr"];
  const locale = useLocale();
  const messages = useMessages();

  if (!locales.includes(locale)) notFound();
  return (
    <html lang={locale}>
      <Head />

      <body
        className={`${
          notoKufiArabic.className
        } dark:bg-gray-900 bg-gray-50 flex flex-col min-h-screen ${
          locale === "ar" && "rtl"
        }`}
      >
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
