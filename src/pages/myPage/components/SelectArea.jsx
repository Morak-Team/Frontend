import Select from "react-select";
import { useState, useEffect } from "react";
import { districtOptions, unitOptions } from "@/constants/myPage/areaOptions";

const SelectArea = ({ onSelect, area: initialArea }) => {
  const [area, setArea] = useState({
    district: null,
    unit: null,
  });

  // 초기값 셋팅
  useEffect(() => {
    const initDistrict = districtOptions.find(
      (opt) => opt.value === initialArea.district
    );
    const initUnit = unitOptions[initialArea.district]?.find(
      (opt) => opt.value === initialArea.unit
    );

    setArea({ district: initDistrict || null, unit: initUnit || null });
  }, [initialArea]);

  // 구 선택 시 → 동 초기화
  const handleDistrictChange = (selected) => {
    setArea({ district: selected, unit: null });
  };

  const handleUnitChange = (selected) => {
    setArea((prev) => ({ ...prev, unit: selected }));
  };

  const handleSubmit = () => {
    if (area.district && area.unit) {
      onSelect({
        district: area.district.value,
        unit: area.unit.value,
      });
    } else {
      alert("지역 정보를 모두 선택해 주세요.");
    }
  };

  return (
    <>
      <Select
        options={districtOptions}
        onChange={handleDistrictChange}
        value={area.district}
        placeholder="구를 선택하세요."
      />
      <Select
        options={area.district ? unitOptions[area.district.value] : []}
        onChange={handleUnitChange}
        value={area.unit}
        isDisabled={!area.district}
        placeholder="동을 선택하세요."
      />
      <button
        className="mt-10 border-blue-400 border p-3 rounded-md"
        onClick={handleSubmit}
      >
        수정하기
      </button>
    </>
  );
};

export default SelectArea;
