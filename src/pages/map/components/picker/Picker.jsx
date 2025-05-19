import { useRef, useEffect, useState } from "react";

const Picker = ({ list, onSelectedChange }) => {
  const ITEM_HEIGHT = 50;
  const VISIBLE_ITEMS = 5;
  const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);
  const paddedList = [
    ...Array(CENTER_INDEX).fill(""),
    ...list,
    ...Array(CENTER_INDEX).fill(""),
  ];

  const [selectedIndex, setSelectedIndex] = useState(CENTER_INDEX);
  const ref = useRef(null);
  const timerRef = useRef(null);

  const handleScroll = () => {
    if (!ref.current) return;
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const scrollTop = ref.current.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const targetTop = index * ITEM_HEIGHT;

      ref.current.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      const selectedValue = paddedList[index + CENTER_INDEX];
      if (selectedValue !== "" && index + CENTER_INDEX !== selectedIndex) {
        setSelectedIndex(index + CENTER_INDEX);
        onSelectedChange && onSelectedChange(selectedValue);
      }
    }, 100);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = selectedIndex * ITEM_HEIGHT;
    }
  }, []);

  return (
    <div
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      className="relative w-28"
    >
      <ul
        ref={ref}
        onScroll={handleScroll}
        className="list-none p-0 m-0 w-full h-[250px] overflow-y-scroll scroll-smooth no-scrollbar"
      >
        <div className="absolute top-[100px] w-full border-t border-b border-gray-300 h-[50px] z-10 pointer-events-none" />

        {paddedList.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={index}
              className={`h-[50px] flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? "text-black font-bold text-xl"
                  : "text-gray-400 text-base"
              }`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Picker;
