import FaqsList from "@/components/Admin/FaqsList";
import React from "react";
import { ToastContainer } from "react-toastify";

const FaqAdmin = () => {
  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
      >
        <FaqsList />
      </div>
    </>
  );
};

export default FaqAdmin;
