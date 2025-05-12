import Picker from "@/pages/map/components/picker/Picker";
import { useState } from "react";
import { motion } from "framer-motion";

const DatePickerSheet = ({ onClose, onConfirm, initialMonth, initialDay }) => {
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

  const [selectedMonth, setSelectedMonth] = useState(initialMonth || "2월");
  const [selectedDay, setSelectedDay] = useState(initialDay || "14일");

  return (
    <div className="fixed inset-0 z-[99999] bg-black bg-opacity-40 flex justify-center items-end">
      {/* 바깥 클릭 시 닫힘 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* ✅ motion.div를 시트 전체에 적용 */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3 }}
        className="relative w-full bg-white rounded-t-xl pt-4 pb-6 px-6 z-10"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-4">
          <button onClick={onClose}>
            <img src="/svgs/review/xIcon.svg" className="w-6 h-6" />
          </button>
        </div>

        {/* ✅ Picker 가운데 정렬 */}
        <div className="flex justify-center gap-4 mb-6">
          <Picker list={months} onSelectedChange={setSelectedMonth} />
          <Picker list={days} onSelectedChange={setSelectedDay} />
        </div>

        <button
          onClick={() => {
            onConfirm({ month: selectedMonth, day: selectedDay });
            onClose();
          }}
          className="w-full py-3 rounded-md bg-primary-8 text-white font-bold"
        >
          확인
        </button>
      </motion.div>
    </div>
  );
};

export default DatePickerSheet;
