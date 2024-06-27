import { useTranslations } from "next-intl";
import React from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  const t = useTranslations("testimonial");

  const testimonialData = [
    {
      content:
        "خدمة ممتازة ورعاية متميزة. أشعر بالراحة دائماً عند زيارة عيادة البسمة.",
      name: "محمد علي",
      imgName: "mohamed_ali.jpg",
    },
    {
      content: "تجربة رائعة! الفريق محترف وودود. أوصي بشدة بعيادة البسمة.",
      name: "سارة أحمد",
      imgName: "sara_ahmed.jpg",
    },
    {
      content:
        "التقنيات الحديثة والرعاية الشخصية تجعل عيادة البسمة اختياري الأول دائماً.",
      name: "أحمد يوسف",
      imgName: "ahmed_youssef.jpg",
    },
    {
      content:
        "تجربة تبييض الأسنان كانت مدهشة، والنتائج رائعة. شكراً عيادة البسمة!",
      name: "ليلى حسن",
      imgName: "leila_hassan.jpg",
    },
    {
      content: "فريق محترف وبيئة مريحة. خدمة رائعة من البداية إلى النهاية.",
      name: "خالد إبراهيم",
      imgName: "khaled_ibrahim.jpg",
    },
    {
      content:
        "أطفالي يحبون زيارة عيادة البسمة. الرعاية هنا مميزة وتفوق التوقعات.",
      name: "منى محمد",
      imgName: "mona_mohamed.jpg",
    },
    {
      content:
        "أفضل عيادة أسنان زرتها على الإطلاق. شكراً لكم على الرعاية الممتازة.",
      name: "علي فؤاد",
      imgName: "ali_fouad.jpg",
    },
    {
      content:
        "خدمات تقويم الأسنان كانت مدهشة، والنتائج أكثر من رائعة. شكراً لفريق البسمة.",
      name: "ندى سمير",
      imgName: "nada_samir.jpg",
    },
    {
      content: "الاهتمام بالتفاصيل والعناية الشخصية يجعلني أشعر بالأمان هنا.",
      name: "عمر عبد الله",
      imgName: "omar_abdallah.jpg",
    },
  ];

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 sm:px-10 lg:px-20 xl:px-40 bg-third
        dark:bg-third/5 border-y dark:border-none`}
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
        {testimonialData.map((data, index) => (
          <TestimonialCard
            key={index}
            content={data.content}
            name={data.name}
            imgName={data.imgName}
          />
        ))}
      </div>{" "}
    </div>
  );
};

export default Testimonial;
