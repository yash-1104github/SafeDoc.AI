import React from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <>
      <div className="mt-6  justify-center flex flex-col items-center py-2 ">
         <AiOutlineLoading3Quarters className="animate-spin text-5xl font-bold mb-4  text-blue-600" />
         <p className="text-sm text-gray-400">Generating Your result....</p>
      </div>
    </>
  );
}
