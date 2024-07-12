"use client";

import firebase from "@/firebase";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { Testimonial } from "@/types/testimonial";

const TestimonialSection = () => {
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
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 sm:px-10 lg:px-20 xl:px-40`}
    >
      {/* Heading */}
      <div
        className={`flex flex-col justify-center items-center gap-3 text-center px-5`}
      >
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <p className={`text-secondary text-normal md:text-lg font-light`}>
          {t("subheading")}
        </p>
      </div>
      {/* Testimonial List */}
      <div
        className={`flex flex-row w-full overflow-x-scroll scroll-smooth bg-secondary/5 sm:rounded-3xl px-2`}
      >
        {testimonials
          .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
          .map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              name={testimonial.giver}
            />
          ))}
      </div>{" "}
    </div>
  );
};

export default TestimonialSection;
