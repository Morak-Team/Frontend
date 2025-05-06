import CompanyTab from "@/pages/support/components/CompanyTab";
import ConsumerTab from "@/pages/support/components/ConsumerTab";
import { useSearchParams } from "react-router-dom";

const SupportPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "consummer";

  const handleTabChange = (value) => {
    setSearchParams({ category: value });
  };

  return (
    <div className="flex flex-col px-5 pt-24 h-[calc(100vh-5.25rem)] overflow-y-auto bg-gray-2">
      <div className="flex gap-2">
        <button
          onClick={() => handleTabChange("consummer")}
          className={`px-4 py-2 rounded-md b1 transition-all duration-300 ease-in-out
            ${category === "consummer" ? "shadow-surface text-gray-12 bg-white" : "text-gray-6 bg-transparent"}
          `}
        >
          소비자
        </button>

        <button
          onClick={() => handleTabChange("company")}
          className={`px-4 py-2 rounded-md b1 transition-all duration-300 ease-in-out
            ${category === "company" ? "shadow-surface text-gray-12 bg-white" : "text-gray-6 bg-transparent"}
          `}
        >
          사장님
        </button>
      </div>

      <div className="mt-7">
        {category === "consummer" ? <ConsumerTab /> : <CompanyTab />}
      </div>
    </div>
  );
};

export default SupportPage;
