import { categoryIconMap } from "@constants/iconMap";
import { useNavigate } from "react-router-dom";
import { businessTypeNameMap } from "@/constants/categoryMap";
import { useState, useEffect } from "react";
import { companyTypeNameMap } from "@/constants/categoryMap";
import { companyTypeIconMap } from "@/constants/categoryMap";
import { isLikedPlace } from "@/pages/review/utils/isLikedPlace";
import { usePaymentStore } from "@/store/paymentStore";
import { likeToggleCompany } from "@/apis/review/likeToggle";

const PlaceInfo = ({ placeInfo }) => {
  const navigate = useNavigate();
  console.log(placeInfo);

  const { companyId } = usePaymentStore();
  console.log(companyId, isLikedPlace(companyId), "좋아요 여부");
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 (선택)
  console.log(isLiked, companyId);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const result = await isLikedPlace(companyId);
        setIsLiked(result);
      } catch (e) {
        console.error("좋아요 여부 확인 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) fetchLikeStatus();
  }, [companyId]);

  // 좋아요 토글 클릭
  const handleLikeClick = async () => {
    try {
      setLoading(true);
      await likeToggleCompany(companyId);
      setIsLiked((prev) => !prev);
    } catch (e) {
      console.error("좋아요 토글 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-5">
      <div className="flex justify-between items-start mt-4 w-full">
        <div className="w-full">
          <h3 className="h3">
            {placeInfo.companyName}
            <span className="ml-2 b5 text-gray-6">
              {businessTypeNameMap[placeInfo.companyCategory] ??
                placeInfo.companyCategory}
            </span>
          </h3>
          <div className="flex items-center justify-start mt-1">
            <img
              src="/svgs/storeReview/fireIcon.svg"
              className="w-4 h-4 mr-1"
            />
            <p className="b4 text-primary-8">
              {placeInfo.temperature.toFixed(2)}도
            </p>
            <p className="b6 ml-2">방문자 리뷰 {placeInfo.reviewCount}개</p>
          </div>

          <div className="bg-secondaryBackground flex flex-col b5 text-secondary3 rounded-xl px-4 py-3 mt-4 w-full leading-relaxed">
            {placeInfo.business}

            {placeInfo.companyType && (
              <div className="inline-flex mt-3 items-center gap-2 px-3 py-1 rounded-xl bg-white w-fit">
                <img
                  src={
                    companyTypeIconMap[
                      companyTypeNameMap[placeInfo.companyType]
                    ]
                  }
                  className="w-4 h-4"
                />

                <span
                  className={`caption2 ${
                    placeInfo.companyType === "PRE"
                      ? "text-pre"
                      : "text-secondary3"
                  }`}
                >
                  {companyTypeNameMap[placeInfo.companyType]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-6 w-full">
        <a
          href={`https://map.naver.com/v5/search/${placeInfo.companyName}`}
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
          onClick={handleLikeClick}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-[#FAFAF9] shrink-0"
        >
          <img
            src={
              isLiked
                ? "/svgs/storeReview/fullHeartIcon.svg"
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
