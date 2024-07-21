"use client";

import Loading from "@/components/Common/Loading";
import {
  svgAddImage,
  svgDefaultImageSmaller,
  svgLoadingWhite,
} from "@/components/svgPaths";
import { useStateContext } from "@/context/stateContext";
import { addBeforeAndAfter } from "@/utils/home";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBeforeAndAfter = () => {
  const t = useTranslations("bna");
  const [beforeImageFile, setBeforeImageFile] = useState<File>();
  const [beforeImage, setBeforeImage] = useState<string>();
  const [afterImageFile, setAfterImageFile] = useState<File>();
  const [afterImage, setAfterImage] = useState<string>();
  const [isPosting, setIsPosting] = useState(false);
  const { isAdmin } = useStateContext();
  const router = useRouter();

  const handleBeforeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBeforeImageFile(file);
      setBeforeImage(URL.createObjectURL(file));
    }
  };

  const handleAfterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAfterImageFile(file);
      setAfterImage(URL.createObjectURL(file));
    }
  };

  if (!isAdmin) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-col justify-center items-center gap-20 w-full h-screen px-10 py-5 overflow-y-auto`}
      >
        <div className={`flex flex-col gap-3 justify-center items-center`}>
          {/* Add before image */}
          <button className="flex flex-col items-center justify-center cursor-default">
            <label htmlFor={`beforeImage`} className="cursor-pointer">
              <div
                className={`flex flex-row justify-center items-center gap-2 bg-primary/30 dark:bg-primary/10 btn hover:px-6
                border border-primary shadow-md`}
              >
                <span>{svgAddImage}</span>
                <p className={`text-primary`}>{t("beforeImage")}</p>
              </div>
            </label>
            <input
              aria-label="tipImage"
              type="file"
              id={`beforeImage`}
              accept="image/*"
              className="absolute -top-10"
              onChange={(e) => handleBeforeImageChange(e)}
            />
          </button>

          {/* Preview */}
          <div
            className={`flex flex-col justify-center items-center w-72 border border-primary rounded-3xl shadow-lg bg-primary/20`}
          >
            <p className={`py-2 text-primary text-xl font-medium`}>
              {t("before")}
            </p>
            {beforeImage ? (
              <Image
                src={beforeImage}
                alt={t("before")}
                height={600}
                width={600}
                className={`object-cover h-40 w-72 rounded-t-3xl border-y border-primary`}
              />
            ) : (
              <span>{svgDefaultImageSmaller}</span>
            )}
            {afterImage ? (
              <Image
                src={afterImage}
                alt={t("after")}
                height={600}
                width={600}
                className={`object-cover h-40 w-72 rounded-b-3xl border-y border-primary`}
              />
            ) : (
              <span>{svgDefaultImageSmaller}</span>
            )}
            <p className={`py-2 text-primary text-xl font-medium`}>
              {t("after")}
            </p>
          </div>

          {/* Add after image */}
          <button className="flex flex-col items-center justify-center cursor-default">
            <label htmlFor={`afterImage`} className="cursor-pointer">
              <div
                className={`flex flex-row justify-center items-center gap-2 bg-primary/30 dark:bg-primary/10 btn hover:px-6
                border border-primary shadow-md`}
              >
                <span>{svgAddImage}</span>
                <p className={`text-primary`}>{t("afterImage")}</p>
              </div>
            </label>
            <input
              aria-label="tipImage"
              type="file"
              id={`afterImage`}
              accept="image/*"
              className="absolute -top-10"
              onChange={(e) => handleAfterImageChange(e)}
            />
          </button>
        </div>

        {/* Submit button */}
        <button
          disabled={!beforeImageFile || !afterImageFile}
          className={`btn px-4 mx-auto bg-primary shadow-Card hover:px-6 ${
            (!beforeImageFile || !afterImageFile) &&
            `cursor-not-allowed bg-gray-300 hover:bg-gray-300 text-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700
          dark:text-gray-500 hover:px-4 shadow-none`
          }`}
          onClick={() => {
            setIsPosting(true);
            addBeforeAndAfter(beforeImageFile, afterImageFile)
              .then(() => {
                setIsPosting(false);
                setBeforeImageFile(undefined);
                setBeforeImage("");
                setAfterImageFile(undefined);
                setAfterImage("");
                toast.success(t("success"));
                setTimeout(() => {
                  router.push(`/admin/before-and-after`);
                }, 1500);
              })
              .catch(() => {
                alert(t("error"));
              });
          }}
        >
          {isPosting ? (
            <span className={`flex flex-row items-center gap-1`}>
              {t("loading")} {svgLoadingWhite}
            </span>
          ) : (
            <span className={`flex flex-row items-center gap-1`}>
              {t("submit")}
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default AddBeforeAndAfter;
