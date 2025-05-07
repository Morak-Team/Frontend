import Picker from "./Picker";
import { useState } from "react";
import { motion } from "framer-motion";

const TimePickerSheet = ({
  onClose,
  onConfirm,
  initialPeriod,
  initialHour,
  initialMinute,
}) => {
  const periods = ["오전", "오후"];
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 1}시`);
  const minutes = Array.from({ length: 60 }, (_, i) => `${i}분`);

  const [period, setPeriod] = useState(initialPeriod || "오전");
  const [hour, setHour] = useState(initialHour || "1시");
  const [minute, setMinute] = useState(initialMinute || "0분");

  return (
    <div className="fixed inset-0 z-[99999] bg-black bg-opacity-40 flex justify-center items-end">
      {/* 바깥 영역 클릭 시 닫기 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* ✅ 슬라이드 애니메이션 바텀시트 */}
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

        <div className="flex justify-center gap-4 mb-6">
          <Picker list={periods} onSelectedChange={setPeriod} />
          <Picker list={hours} onSelectedChange={setHour} />
          <Picker list={minutes} onSelectedChange={setMinute} />
        </div>

        <button
          onClick={() => {
            onConfirm({ period, hour, minute });
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

export default TimePickerSheet;
