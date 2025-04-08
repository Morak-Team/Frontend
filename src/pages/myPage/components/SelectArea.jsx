import Select from "react-select";
import { useState } from "react";
import { districtOptions, unitOptions } from "@/constants/myPage/areaOptions";

const SelectArea = ({ onSelect, area }) => {
  // 셀렉트 부분의 초깃값으로 부모 컴포넌트로부터 받아온 지역 정보를 넣어둡니다.
  // 자식 컴포넌트에서 직접 관리할 지역 정보 상태 변수를 하나 선언합니다. 부모와 마찬가지로 구, 동으로 이루어진 객체입니다.
  // 구 셀렉트 부분에 onChange 이벤트가 발생하면 구 부분을 업데이트합니다.
  // 동 셀렉트 부분에 onChange 이벤트가 발생하면 동 부분을 업데이트합니다.
  // 버튼을 하나 생성해, 수정하기 버튼을 만들고 해당 버튼에 onClick 이벤트를 걸어 클릭 이벤트가 발생하면 부모로부터 받아온 onSelect 함수를
  // 실행하여 부모 컴포넌트의 지역 정보 상태 변수를 업데이트합니다.
  // 버튼 클릭과 동시에, 서버로 api post 요청을 보내 데이터베이스의 유저 지역 정보를 업데이트합니다.

  const [district, setDistrict] = useState(null);
  const [areaInfo, setAreaInfo] = useState({
    district: "서울",
    unit: "방이동",
  });

  const handleDistrictChange = (selected) => {
    onSelect(selected?.value);
    setDistrict(selected);
  };

  return (
    <>
      <Select
        options={districtOptions}
        onChange={handleDistrictChange}
        placeholder={"구를 선택하세요."}
      />
      <Select
        options={district ? unitOptions[district.value] : []}
        placeholder={"동을 선택하세요."}
        isDisabled={!district}
      />
    </>
  );
};

export default SelectArea;
