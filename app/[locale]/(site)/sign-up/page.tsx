"use client";

import React, { FormEvent, use, useEffect, useState } from "react";
import firebase from "@/firebase";
import { useRouter } from "next/navigation";
import { handleSignUp, handleSignUpWithGoogle } from "@/utils/auth";
import { useLocale, useTranslations } from "next-intl";
import { svgGoogle, svgLoadingWhite } from "@/components/svgPaths";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { countries } from "@/components/countries";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@nextui-org/react";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const SignUp = () => {
  const t = useTranslations("signUp");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(0);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [dialCode, setDialCode] = useState("");

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");

  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setGenderError("");
    setCountryError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.includes("@") &&
      email.includes(".") &&
      email.length >= 5 &&
      phoneNumber > 999 &&
      gender.length > 0 &&
      country.length > 0 &&
      password.length > 8 &&
      confirmPassword === password
    ) {
      setIsLoading(true);
      const fetchUser = handleSignUp({
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        country,
        password,
        confirmPassword,
      });
      setUser(await fetchUser);
    }
    if (firstName.length < 1) {
      setFirstNameError(t("firstNameError"));
    }
    if (lastName.length < 1) {
      setLastNameError(t("lastNameError"));
    }
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setEmailError(t("emailError"));
    }
    if (phoneNumber < 1000) {
      setPhoneNumberError(t("phoneNumberError"));
    }
    if (gender.length < 1) {
      setGenderError(t("genderError"));
    }
    if (country.length < 1) {
      setCountryError(t("countryError"));
    }
    if (password.length < 8) {
      setPasswordError(t("passwordError"));
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError(t("confirmPasswordError"));
    }
  };

  const onInputChange = (value: string) => {
    setCountry(value);
    const dialNumber = countries.find(
      (item) => item.countryAr === value || item.countryEn === value
    );

    setDialCode(dialNumber?.phone || "");
  };

  const handleGenderSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleSubmitWithGoogle = async () => {
    const fetchUser = handleSignUpWithGoogle();
    setUser(await fetchUser);
  };

  if (user) {
    router.push(`/${locale}/${user.uid}`);
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-full py-20 lg:px-32 md:h-[100vh] ${
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

        <div className={`flex flex-col gap-5 justify-center items-center p-5`}>
          <div
            className={`flex md:flex-row flex-col gap-4 w-full justify-start items-start`}
          >
            <div
              className={`flex flex-col justify-center items-center w-[90%] mx-auto`}
            >
              <input
                aria-label="firstName"
                name="firstName"
                type="text"
                placeholder={t("firstName")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full mx-auto ${
                  isArabic && "rtl"
                }`}
              />
              <p
                className={`text-[#d33] text-sm font-light w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {firstNameError}
              </p>
            </div>

            <div
              className={`flex flex-col justify-center items-center w-[90%] mx-auto`}
            >
              <input
                aria-label="lastName"
                name="lastName"
                type="text"
                placeholder={t("lastName")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full mx-auto ${
                  isArabic && "rtl"
                }`}
              />
              <p
                className={`text-[#d33] text-sm font-light w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {lastNameError}
              </p>
            </div>
          </div>

          <div
            className={`flex md:flex-row flex-col gap-4 w-full justify-start items-start`}
          >
            <div
              className={`flex flex-col justify-center items-center w-[90%] mx-auto`}
            >
              <Select
                aria-label="gender"
                dir={isArabic ? "rtl" : "ltr"}
                placeholder={t("gender")}
                selectedKeys={[gender]}
                style={{ height: "56px" }}
                onChange={handleGenderSelected}
              >
                <SelectItem key={t("male")} className={`mx-0`}>
                  {t("male")}
                </SelectItem>
                <SelectItem key={t("female")} className={`mx-0`}>
                  {t("female")}
                </SelectItem>
              </Select>
              <p
                className={`text-[#d33] text-sm font-light w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {genderError}
              </p>
            </div>

            <div
              className={`flex flex-col justify-center items-center w-[90%] mx-auto`}
            >
              <Autocomplete
                aria-label="country"
                name="country"
                label={t("country")}
                onInputChange={onInputChange}
              >
                {countries.map((country) => (
                  <AutocompleteItem
                    key={country.code}
                    value={country.code}
                    className={`mx-0`}
                  >
                    {isArabic ? country.countryAr : country.countryEn}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <p
                className={`text-[#d33] text-sm font-light w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {countryError}
              </p>
            </div>
          </div>

          <div
            className={`flex md:flex-row flex-col gap-4 w-full justify-start items-start`}
          >
            <div
              className={`flex flex-col justify-center items-center w-[90%] mx-auto`}
            >
              <input
                aria-label="email"
                name="email"
                type="email"
                placeholder={t("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full mx-auto ltr ${
                  isArabic && "placeholder:text-right"
                }`}
              />
              <p
                className={`text-[#d33] text-sm font-light w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {emailError}
              </p>
            </div>

            <div
              className={`flex flex-col justify-center items-center w-[90%] mx-auto`}
            >
              <div className={`flex flex-row justify-center items-center`}>
                <input
                  aria-label="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder={t("phoneNumber")}
                  value={phoneNumber === 0 ? "" : phoneNumber}
                  onChange={(e) => setPhoneNumber(+e.target.value)}
                  required
                  className={`rounded-s-md outline-none border focus:border-primary/50 p-3 w-[85%] ${
                    (phoneNumber === 0 || !phoneNumber) && "rtl"
                  }`}
                />
                <div
                  className={`bg-primary rounded-e-md text-white p-3 w-[15%]`}
                >
                  {`${dialCode}+`}
                </div>
              </div>
              <p
                className={`text-[#d33] text-sm font-light w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {phoneNumberError}
              </p>
            </div>
          </div>

          <div
            className={`flex md:flex-row flex-col gap-4 w-full justify-start items-start`}
          >
            <div
              className={`flex flex-col justify-center items-center w-[90%] mx-auto`}
            >
              <input
                aria-label="password"
                name="password"
                type="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full mx-auto ${
                  isArabic && "rtl"
                }`}
              />
              <p
                className={`text-[#d33] text-sm font-light w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {passwordError}
              </p>
            </div>

            <div
              className={`flex flex-col justify-center items-center w-[90%] mx-auto`}
            >
              <input
                aria-label="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder={t("confirmPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full mx-auto ${
                  isArabic && "rtl"
                }`}
              />
              <p
                className={`text-[#d33] text-sm font-light w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {confirmPasswordError}
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className={`btn bg-primary shadow-lg flex flex-row justify-center items-center gap-2`}
          >
            {t("signUp")}
            <span className={`${!isLoading && "hidden"}`}>
              {svgLoadingWhite}
            </span>
          </button>

          <div className={`border-t border-t-primary/60 w-full`}></div>

          <div
            onClick={handleSubmitWithGoogle}
            className={`btn bg-secondary cursor-pointer flex flex-row gap-1 items-center shadow-lg`}
          >
            <span className={`bg-white p-1 rounded-full shadow-Card`}>
              {svgGoogle}
            </span>
            {t("signUpWithGoogle")}
          </div>

          <p className="font-light text-primary text-sm">
            {t("alreadyMember")}
            <Link
              locale={locale}
              href="/sign-in"
              className="text-secondary font-medium hover:underline"
            >
              {t("signin")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
