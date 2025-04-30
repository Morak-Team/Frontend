import CompanyTab from "@/pages/support/components/CompanyTab";
import ConsummerTab from "@/pages/support/components/ConsummerTab";
import { useState } from "react";

const SupportPage = () => {
  const [category, setCategory] = useState("consummer");

  return (
    <div className="flex flex-col p-5 h-[calc(100vh-5.25rem)] overflow-y-auto">
      <div className="mt-10">
        <p className="h2">지원</p>
      </div>

      <div className="mt-8 flex gap-2">
        <button
          onClick={() => setCategory("consummer")}
          className={`px-4 py-2 rounded-md b1 transition-all duration-300 ease-in-out
            ${category === "consummer" ? "shadow-surface text-gray-12 bg-white" : "text-gray-6 bg-transparent"}
          `}
        >
          소비자
        </button>

        <button
          onClick={() => setCategory("company")}
          className={`px-4 py-2 rounded-md b1 transition-all duration-300 ease-in-out
            ${category === "company" ? "shadow-surface text-gray-12 bg-white" : "text-gray-6 bg-transparent"}
          `}
        >
          사장님
        </button>
      </div>

      <div className="mt-7">
        {category === "consummer" ? <ConsummerTab /> : <CompanyTab />}
      </div>
    </div>
  );
};

export default SupportPage;
