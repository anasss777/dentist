"use client";

import firebase from "@/firebase";
import Loading from "@/components/Common/Loading";
import {
  svgAddImage,
  svgDefaultImageSmaller,
  svgLoadingWhite,
} from "@/components/svgPaths";
import { useStateContext } from "@/context/stateContext";
import { BeforeAndAfter } from "@/types/beforeAndAfter";
import { editBeforeAndAfter } from "@/utils/home";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

type Props = {
  params: { bna: string };
};

const EditBeforeAndAfter = ({ params }: Props) => {
  const id = params.bna;
  const [bna, setBna] = useState<BeforeAndAfter | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("bna");
  const [beforeImageFile, setBeforeImageFile] = useState<File>();
  const [beforeImage, setBeforeImage] = useState<string>();
  const [afterImageFile, setAfterImageFile] = useState<File>();
  const [afterImage, setAfterImage] = useState<string>();
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();

  const { isAdmin } = useStateContext();

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

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("bnas")
      .onSnapshot((snapshot) => {
        const newBnas: BeforeAndAfter[] = []; // Create a new array to hold updated bnas
        snapshot.forEach((doc) => {
          newBnas.push({
            id: doc.id,
            ...doc.data(),
          } as BeforeAndAfter);
        });

        // Set a bna based on id
        const bna = newBnas.find((bna) => bna.id === id);
        if (bna) {
          setBna(bna);
          setBeforeImage(bna.beforeImage);
          setAfterImage(bna.afterImage);
          setLoading(false);
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div
        className={`flex flex-col justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20`}
      >
        <Loading />
      </div>
    );
  }

  if (!bna) {
    return <p>No data found.</p>;
  }

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
                <p className={`text-primary`}>{t("editBeforeImage")}</p>
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
                <p className={`text-primary`}>{t("editAfterImage")}</p>
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
          className={`btn px-4 mx-auto bg-primary shadow-Card hover:px-6`}
          onClick={() => {
            setIsPosting(true);
            editBeforeAndAfter(
              id,
              bna.beforeImage,
              bna.afterImage,
              beforeImageFile,
              afterImageFile
            )
              .then(() => {
                toast.success(t("editSuccess"));
                setTimeout(() => {
                  setIsPosting(false);
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
              {t("editing")} {svgLoadingWhite}
            </span>
          ) : (
            <span className={`flex flex-row items-center gap-1`}>
              {t("edit")}
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default EditBeforeAndAfter;
