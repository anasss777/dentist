"use client";

import React, { FormEvent, useEffect, useState } from "react";
import firebase from "@/firebase";
import { useLocale, useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Loading from "@/components/Common/Loading";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const ChangePassword = () => {
  const t = useTranslations("changePasswordPage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string>();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user && user.email) {
      setEmail(user.email);
    }
  }, []);

  const handleChangePassword = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const user = firebase.auth().currentUser;
      if (user && user.email) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

        // Reauthenticate the user
        await user.reauthenticateWithCredential(credential);

        // Update the password
        await user.updatePassword(newPassword);
        Swal.fire({
          text: t("success"),
          icon: "success",
          confirmButtonColor: "#4682b4",
          confirmButtonText: t("ok"),
        });
        setCurrentPassword("");
        setNewPassword("");
        setError("");
      }
    } catch (error: any) {
      console.log(error.message);
      const errorMessage = t("errorMessage");
      setError(errorMessage);
    }
  };

  if (!email) {
    return <Loading />;
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-full lg:px-32 h-[70vh] ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <form
        onSubmit={handleChangePassword}
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
          <p className={`text-gray-400 font-bold`}>
            <span className={`text-secondary`}>{t("email")}</span>
            {email}
          </p>
          <input
            type="password"
            placeholder={t("currentPassword")}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className={`rounded-md outline-none border focus:border-primary/50 p-2 w-full ${
              isArabic && "rtl"
            }`}
          />
          <input
            type="password"
            placeholder={t("newPassword")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={`rounded-md outline-none border focus:border-primary/50 p-2 w-full ${
              isArabic && "rtl"
            }`}
          />
          <button type="submit" className={`btn bg-primary hover:px-6`}>
            {t("changePassword")}
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
