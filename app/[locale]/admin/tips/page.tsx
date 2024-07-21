import TipsList from "@/components/Admin/TipsList";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Articles = () => {
  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
      >
        <TipsList />
      </div>
    </>
  );
};

export default Articles;
