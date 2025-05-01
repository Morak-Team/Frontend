import { categoryIconMap } from "@constants/iconMap";
import { useNavigate } from "react-router-dom";

const PlaceInfo = () => {
  const navigate = useNavigate();
  const dummy = {
    name: "블루웨일",
    businessType: "카페",
    category: "일자리제공",
    address: "서울 송리단길",
    distance: "98도 방문자 리뷰 27",
    images: [],
    liked: false,
  };

  const categoryIcon = categoryIconMap[dummy.category];

  return (
    <div className="w-full px-5">
      <div className="flex justify-between items-start mt-4 w-full">
        <div className="w-full">
          <h3 className="h3">
            {dummy.name}
            <span className="b5 text-gray-6 ml-1">{dummy.businessType}</span>
          </h3>
          <div className="flex items-center justify-start mt-1">
            <img
              src="/svgs/storeReview/fireIcon.svg"
              className="w-4 h-4 mr-1"
            />
            <p className="text-sm font-semibold text-orange-500">98도</p>
            <p className="b6 ml-2">방문자 리뷰 27개</p>
          </div>

          <div className="bg-secondaryBackground b5 text-secondaryText rounded-xl px-4 py-3 mt-4 w-full leading-relaxed">
            승리단길에 위치한 장애인과 비장애인이 함께하는 공간, 카페
            블루웨일입니다.
            <div className="flex gap-2 mt-2">
              <div className="flex gap-1 bg-blue-100 px-3 py-1 rounded-full items-center w-fit">
                <img
                  src="/svgs/map/tagIcon.svg"
                  alt="tag"
                  className="w-4 h-4"
                />
                <p className="caption2 text-blue-600">{dummy.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-6 w-full">
        <a
          href={`https://map.naver.com/v5/search/${dummy.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 py-3 flex items-center justify-center gap-2 rounded-md bg-[#FAFAF9] text-sm text-zinc-900 font-medium overflow-hidden"
        >
          <img
            src="/svgs/storeReview/naverMapIcon.svg"
            className="w-6 h-6 shrink-0"
          />
          <span>네이버 지도에서 길찾기</span>
        </a>

        <button
          onClick={() => {}}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-[#FAFAF9] shrink-0"
        >
          <img
            src={
              dummy.liked
                ? "/svgs/storeReview/fillHeartIcon.svg"
                : "/svgs/storeReview/emptyHeartIcon.svg"
            }
            alt="좋아요 버튼"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
};

export default PlaceInfo;
