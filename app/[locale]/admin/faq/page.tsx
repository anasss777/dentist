import FaqsList from "@/components/Admin/FaqsList";
import React from "react";

const FaqAdmin = () => {
  return (
    <div
      className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
    >
      <FaqsList />
    </div>
  );
};

export default FaqAdmin;
