import { useRef } from "react";
import StoryContent from "@/pages/story/components/content/StoryContent";

const StoryCarousel = () => {
  const contentSample = [
    {
      num: 5,
      title: "A 업체",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKuLDrxGqOTapgqfxl13u_xeeiDpbr7LSgA&s",
    },
    {
      num: 6,
      title: "A 업체",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKuLDrxGqOTapgqfxl13u_xeeiDpbr7LSgA&s",
    },
    {
      num: 7,
      title: "A 업체",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKuLDrxGqOTapgqfxl13u_xeeiDpbr7LSgA&s",
    },
    {
      num: 8,
      title: "A 업체",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKuLDrxGqOTapgqfxl13u_xeeiDpbr7LSgA&s",
    },
    {
      num: 9,
      title: "A 업체",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKuLDrxGqOTapgqfxl13u_xeeiDpbr7LSgA&s",
    },
    {
      num: 10,
      title: "A 업체",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKuLDrxGqOTapgqfxl13u_xeeiDpbr7LSgA&s",
    },
    {
      num: 11,
      title: "A 업체",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKuLDrxGqOTapgqfxl13u_xeeiDpbr7LSgA&s",
    },
  ];

  const scrollRef = useRef(null);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e) => {
    isDown = true;
    const slider = scrollRef.current;
    slider.classList.add("grabbing");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove("grabbing");
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove("grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const slider = scrollRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.6; // sensitivity 조정 가능
    slider.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      className="w-full m-5 overflow-x-auto whitespace-nowrap scrollbar-hide cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="inline-flex gap-2">
        {contentSample.map((item, idx) => (
          <StoryContent
            key={idx}
            title={item.title}
            img={item.img}
            idx={idx}
            num={item.num}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryCarousel;
