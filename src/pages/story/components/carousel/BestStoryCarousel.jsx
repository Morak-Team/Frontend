import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/swiper.css"; // 👈 아래의 스타일이 여기에 포함되어야 함
import SlideContent from "@/pages/story/components/content/SlideContent";

const BestStoryCarousel = ({ data, isLoading }) => {
  return (
    <div className="relative pt-4">
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col justify-center items-center">
          <div className="loader"></div>
          <p className="mt-4 text-gray-500 b5">잠시만 기다려주세요…</p>
        </div>
      )}
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
        {data?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <SlideContent data={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 커스텀 인디케이터 */}
      <div className="custom-pagination flex justify-center gap-2 mt-4" />
    </div>
  );
};

export default BestStoryCarousel;
