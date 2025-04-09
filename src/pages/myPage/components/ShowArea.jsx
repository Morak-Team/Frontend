import { useState } from "react";
import SelectArea from "@/pages/myPage/components/SelectArea";

const ShowArea = () => {
  const [area, setArea] = useState({ district: "강남구", unit: "수서동" });

  const handleSelect = ({ district, unit }) => {
    setArea({ district, unit });
  };

  return (
    <>
      <div>
        <h1 className="mt-10 mb-10">
          내가 사는 지역은 {area.district} {area.unit}입니다!
        </h1>
        <SelectArea onSelect={handleSelect} area={area} />
      </div>
    </>
  );
};

export default ShowArea;
