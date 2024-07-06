"use client";

import firebase from "@/firebase";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import InstagramReel from "../Common/InstagramReel";
import Link from "next/link";

type Highlight = {
  link1: string;
  link2: string;
  link3: string;
};

const Highlights = () => {
  const t = useTranslations("highlights");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("highlightsSection")
      .doc("XcK8AedFG8EYkLIANt8o")
      .onSnapshot((doc) => {
        if (doc.exists) {
          setLink1((doc.data() as Highlight).link1);
          setLink2((doc.data() as Highlight).link2);
          setLink3((doc.data() as Highlight).link3);
        } else {
          console.log("No such document!");
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40 bg-third
        dark:bg-third/5 border-y dark:border-none`}
    >
      {/* Heading */}
      <div
        className={`flex flex-col justify-center items-center gap-3 text-center`}
      >
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <p className={`text-secondary text-normal md:text-lg font-light`}>
          {t("subheading")}
        </p>
      </div>

      {/* Highlights List */}
      <div className={`flex flex-wrap justify-center items-start w-full`}>
        {link1 && <InstagramReel url={link1} />}
        {link2 && <InstagramReel url={link2} />}
        {link3 && <InstagramReel url={link3} />}
      </div>

      <Link
        href="https://www.instagram.com/dtahmed_osman/"
        target="_blank"
        className={`btn bg-primary text-normal md:text-lg hover:px-6 -mt-16`}
      >
        {t("seeMore")}
      </Link>
    </div>
  );
};

export default Highlights;
