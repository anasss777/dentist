import TestimonialList from "@/components/Admin/TestimonialsList";
import React from "react";

const TestimonialsAdmin = () => {
  return (
    <div
      className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
    >
      <TestimonialList />
    </div>
  );
};

export default TestimonialsAdmin;
