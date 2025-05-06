import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/swiper.css"; // 👈 아래의 스타일이 여기에 포함되어야 함
import SlideContent from "@/pages/story/components/content/SlideContent";

const BestStoryCarousel = () => {
  const sampleData = [
    {
      num: 1,
      title: "슬라이드 1",
      img: "/images/1.jpeg",
      author: "가나디1",
    },
    {
      num: 2,
      title: "슬라이드 2",
      img: "/images/2.jpeg",
      author: "가나디2",
    },
    {
      num: 2,
      title: "슬라이드 2",
      img: "/images/2.jpeg",
      author: "가나디2",
    },
    {
      num: 2,
      title: "슬라이드 2",
      img: "/images/2.jpeg",
      author: "가나디2",
    },
    {
      num: 2,
      title: "슬라이드 2",
      img: "/images/2.jpeg",
      author: "가나디2",
    },
  ];

  return (
    <div className="relative pt-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        className="w-full rounded-xl"
      >
        {sampleData.map((item, idx) => (
          <SwiperSlide key={idx}>
            <SlideContent title={item.title} img={item.img} num={item.num} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 커스텀 인디케이터 */}
      <div className="custom-pagination flex justify-center gap-2 mt-4" />
    </div>
  );
};

export default BestStoryCarousel;
