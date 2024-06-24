import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ["ar", "en", "tr"],
    defaultLocale: "ar",
    localeDetection: false
});

export const config = {

    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
