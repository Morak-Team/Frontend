import { useState } from "react";
import SelectArea from "@/pages/myPage/components/SelectArea";

const ShowArea = () => {
  // 여기서 상태 하나로 구, 동을 관리합니다.
  // 자식 컴포넌트로 구, 동을 관리하는 useState를 변경할 수 있는 "콜백 함수"를 props로 내려보냅니다.
  // 자식 컴포넌트에서 onChange 이벤트가 발생하여 콜백 함수가 실행되면, 인자 값으로 받아 온 새로운 지역 정보로 상태를 업데이트합니다.

  const [area, setArea] = useState({ district: "서울시", unit: "XX동" });

  const handleSelect = (area) => {
    // setArea({area.district, area.unit});
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
