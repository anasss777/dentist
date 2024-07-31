"use client";

import { Profile } from "@/types/profile";
import React, { FormEvent, useState } from "react";
import { svgCloseDark } from "../svgPaths";
import { useLocale, useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { EditProfileInfo } from "@/utils/profile";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { countries } from "../countries";
import ProfileImage from "./ProfileImage";

type Props = {
  openEditProfile: boolean;
  setOpenEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  profile: Profile;
};

const EditProfile = ({
  openEditProfile,
  setOpenEditProfile,
  profile,
}: Props) => {
  const t = useTranslations("profile");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [firstName, setFirstName] = useState(profile.name.split(" ")[0]);
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState(profile.name.split(" ")[1]);
  const [lastNameError, setLastNameError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [dialCode, setDialCode] = useState(() => {
    const dialNumber = countries.find(
      (item) =>
        item.countryAr === profile.country || item.countryEn === profile.country
    );

    return dialNumber?.phone || "";
  });

  const [gender, setGender] = useState(profile.gender);

  const [country, setCountry] = useState(profile.country);

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFirstNameError("");
    setLastNameError("");
    setPhoneNumberError("");

    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      phoneNumber > 999 &&
      gender.length > 0 &&
      country.length > 0
    ) {
      EditProfileInfo({
        userId: profile.userId,
        name: `${firstName} ${lastName}`,
        phoneNumber,
        gender,
        country,
      });
      Swal.fire({
        text: t("profileEdited"),
        icon: "success",
        confirmButtonColor: "#4682b4",
        confirmButtonText: t("ok"),
      }).then((result) => {
        if (result.isConfirmed) {
          setOpenEditProfile(!openEditProfile);
        }
      });
    }
    if (firstName.length < 1) {
      setFirstNameError(t("firstNameError"));
    }
    if (lastName.length < 1) {
      setLastNameError(t("lastNameError"));
    }
    if (phoneNumber < 1000) {
      setPhoneNumberError(t("phoneNumberError"));
    }
  };

  return (
    <div
      className={`flex flex-col justify-start items-center gap-1 bg-gray-200 dark:bg-gray-800 m-5 rounded-lg overflow-y-auto max-w-[400px]
      h-fit w-full mx-auto p-2`}
    >
      <div className={`flex flex-col justify-between h-full w-full`}>
        <button onClick={() => setOpenEditProfile(!openEditProfile)}>
          {svgCloseDark}
        </button>

        {/* Edit Profile image */}
        <div className={`flex justify-center items-center w-full`}>
          <ProfileImage profile={profile} />
        </div>

        <div
          className={`flex flex-col justify-start items-start gap-5 h-full w-full pt-5 pb-10`}
        >
          {/* First name */}
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
              className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full mx-auto`}
            />
            <p
              className={`text-[#d33] text-sm font-light w-full ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {firstNameError}
            </p>
          </div>

          {/* Last name */}
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
              className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full mx-auto`}
            />
            <p
              className={`text-[#d33] text-sm font-light w-full ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {lastNameError}
            </p>
          </div>

          {/* Gender */}
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
          </div>

          {/* Country */}
          <div
            className={`flex flex-col justify-center items-center w-[90%] mx-auto`}
          >
            <Autocomplete
              aria-label="country"
              name="country"
              label={country ? country : t("country")}
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
          </div>

          {/* Phone number */}
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
              <div className={`bg-primary rounded-e-md text-white p-3 w-[15%]`}>
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

        <div className={`flex flex-col justify-start items-center px-8`}>
          <div className={`flex flex-row gap-2`}>
            <button
              className={`btn hover:px-6 bg-primary shadow-lg`}
              onClick={handleSubmit}
            >
              {t("edit")}
            </button>

            <button
              onClick={() => setOpenEditProfile(!openEditProfile)}
              className={`btn hover:px-6 bg-red-600 shadow-lg`}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
