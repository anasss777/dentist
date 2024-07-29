"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { svgAdd } from "../svgPaths";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { Testimonial } from "@/types/testimonial";
import TestimonialsRow from "./TestimonialsRow";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const TestimonialList = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("testimonial");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("testimonials")
      .onSnapshot((snapshot) => {
        const newTestimonials: Testimonial[] = []; // Create a new array to hold updated Testimonials
        snapshot?.forEach((doc) => {
          newTestimonials.push({
            id: doc.id,
            ...doc.data(),
          } as Testimonial);
        });

        setTestimonials(newTestimonials);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className={`w-full ${isArabic && "rtl"}`}>
      {/* Button to add new Testimonial */}
      <Link
        href="/admin/testimonials/add"
        locale={locale}
        className={`btn bg-secondary rounded-none flex flex-row justify-center items-center gap-3 mb-10`}
      >
        <span>{svgAdd}</span> {t("addTestimonial")}
      </Link>

      {/* Testimonials List */}
      <table className={`w-full`}>
        <tbody>
          {/* Heading */}
          <tr
            className={`bg-primary shadow-Card2 py-2 px-5 rounded-full text-white`}
          >
            <th
              className={`p-2 ${
                isArabic ? "rounded-r-full" : "rounded-l-full"
              }`}
            >
              {t("giver")}
            </th>
            <th className={`p-2`}>{t("content")}</th>
            <th
              className={`p-2 ${
                isArabic ? "rounded-l-full" : "rounded-r-full"
              }`}
            >
              {t("manage")}
            </th>
          </tr>

          {/* Testimonials */}
          {testimonials
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
            .map((testimonials, index) => (
              <TestimonialsRow key={index} testimonial={testimonials} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialList;
