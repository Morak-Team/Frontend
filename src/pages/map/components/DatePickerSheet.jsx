import Picker from "./Picker";
import { useState } from "react";

const DatePickerSheet = ({ onClose, onConfirm, initialMonth, initialDay }) => {
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

  const [selectedMonth, setSelectedMonth] = useState(initialMonth || "2월");
  const [selectedDay, setSelectedDay] = useState(initialDay || "14일");

  return (
    <div className="fixed inset-0 z-[99999] bg-black bg-opacity-40 flex justify-center items-end">
      <div className="w-full bg-white rounded-t-xl pt-4 pb-6 px-6">
        <div className="flex justify-end mb-4">
          <button onClick={onClose}>
            <img src="/svgs/review/xIcon.svg" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Picker list={months} onSelectedChange={setSelectedMonth} />
          <Picker list={days} onSelectedChange={setSelectedDay} />
        </div>

        <button
          onClick={() => {
            onConfirm({ month: selectedMonth, day: selectedDay });
            onClose();
          }}
          className="w-full py-3 rounded-md bg-orange-500 text-white font-bold"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default DatePickerSheet;
