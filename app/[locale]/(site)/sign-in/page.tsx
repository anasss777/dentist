"use client";

import firebase from "@/firebase";
import { handleSignIn, handleSignInWithGoogle } from "@/utils/auth";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { svgGoogle, svgLoadingWhite } from "@/components/svgPaths";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const SignIn = () => {
  const t = useTranslations("signUp");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  const [user, setUser] = useState<firebase.User | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPasswordError("");
    setEmailError("");

    if (
      userInfo.email.length >= 5 &&
      userInfo.email.includes("@") &&
      userInfo.email.includes(".") &&
      userInfo.password.length > 8
    ) {
      setIsLoading(true);

      const fetchUser = handleSignIn(userInfo.email, userInfo.password);
      if ((await fetchUser) === null) {
        setPasswordError2(t("passwordError2"));
        setIsLoading(false);
      }
      setUser(await fetchUser);
    }
    if (
      !userInfo.email.includes("@") ||
      !userInfo.email.includes(".") ||
      userInfo.email.length < 5
    ) {
      setEmailError(t("emailError"));
    }
    if (userInfo.password.length < 8) {
      setPasswordError(t("passwordError"));
    }
  };

  const handleSubmitWithGoogle = async () => {
    const fetchUser = handleSignInWithGoogle();
    if ((await fetchUser) === null) {
      alert(t("notRegistered"));
    }
    setUser(await fetchUser);
  };

  if (user) {
    router.push(`/${locale}/${user.uid}`);
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-full lg:px-32 h-[70vh] ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <form
        name="signUp"
        className={`flex flex-col gap-5 justify-center items-center bg-white dark:bg-white/10 rounded-3xl shadow-Card lg:w-fit w-[90%]`}
      >
        {/* Logo */}
        <Link
          href="/"
          locale={locale}
          className={`flex flex-row justify-center items-center gap-1 bg-primary w-full py-3 rounded-t-3xl`}
        >
          <p
            className={`text-white text-xl font-marhey bg-white/10 rounded-xl px-2 border-2 border-white`}
          >
            Demo
          </p>
        </Link>

        <div
          className={`flex flex-col gap-5 justify-center items-center p-5 w-full`}
        >
          <div className={`flex flex-col gap-3 w-full`}>
            <input
              aria-label="email"
              name="email"
              type="email"
              placeholder={t("email")}
              value={userInfo.email}
              onChange={handleInputChange}
              required
              className={`rounded-md outline-none border focus:border-primary/50 p-3 w-[90%] mx-auto ltr ${
                isArabic && "placeholder:text-right"
              }`}
            />
            <p
              className={`text-[#d33] text-sm font-light w-full px-6 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {emailError}
            </p>

            <input
              aria-label="password"
              name="password"
              type="password"
              placeholder={t("password")}
              value={userInfo.password}
              onChange={handleInputChange}
              required
              className={`rounded-md outline-none border focus:border-primary/50 p-3 w-[90%] mx-auto ${
                isArabic && "rtl"
              }`}
            />
            <p
              className={`text-[#d33] text-sm font-light w-full px-6 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {passwordError}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className={`btn bg-primary shadow-lg flex flex-row justify-center items-center gap-2`}
          >
            {t("signIn")}
            <span className={`${!isLoading && "hidden"}`}>
              {svgLoadingWhite}
            </span>
          </button>
          <p
            className={`text-[#d33] text-sm font-light w-full px-6 ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            {passwordError2}
          </p>

          <div className={`border-t border-t-primary/60 w-full`}></div>

          <div
            onClick={handleSubmitWithGoogle}
            className={`btn bg-secondary cursor-pointer flex flex-row gap-1 items-center`}
          >
            <span className={`bg-white p-1 rounded-full shadow-Card`}>
              {svgGoogle}
            </span>
            {t("signInWithGoogle")}
          </div>

          <p className="font-light text-primary text-sm">
            {t("notMember")}
            <Link
              locale={locale}
              href="/sign-up"
              className="text-secondary font-medium hover:underline"
            >
              {t("signup")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
