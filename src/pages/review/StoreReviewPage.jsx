import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import PlaceInfo from "@/pages/review/components/PlaceInfo";
import useUIStore from "@/store/uiStore";

import ReviewImageCapture from "@/pages/map/components/review/ReviewImageCapture";
import ConfirmImage from "@/pages/map/components/review/ConfirmImage";
import Reviews from "@/pages/review/components/Reviews";
import { useGetCompanyPreview } from "@/apis/company/queries";

const StoreReviewPage = () => {
  const navigate = useNavigate();
  const { companyId: companyIdParam } = useParams();
  const companyId = Number(companyIdParam);
  const [companyInfo, setCompanyInfo] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const { turnOnCamera, setTurnOnCamera } = useUIStore();

  const {
    data: placeInfo,
    isLoading: placeLoading,
    error: placeError,
  } = useGetCompanyPreview(companyId);

  if (placeLoading) {
    return (
      <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }
  if (placeError) {
    return (
      <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col justify-center items-center">
        <div className="loader"></div>
        <p className="mt-4 text-gray-500 b5">오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pt-14 mx-5 items-center">
        <img
          src="/svgs/storeReview/backIcon.svg"
          className="w-8 h-8"
          onClick={() => navigate("/")}
        />
      </div>

      <PlaceInfo placeInfo={placeInfo} />

      <div className="w-full h-2 bg-gray-3 mt-5" />

      <div className="p-5">
        <Reviews setTurnOnCamera={setTurnOnCamera} companyId={companyId} />
      </div>

      {turnOnCamera && (
        <ReviewImageCapture
          companyId={companyId}
          turnOnCamera={turnOnCamera}
          onCloseCamera={() => setTurnOnCamera(false)}
          onCaptureSuccess={(data) => {
            setCompanyInfo(data); // 즉시 로컬 상태에 저장
            setShowConfirm(true); // 그다음 Confirm 렌더링
          }}
        />
      )}

      {showConfirm && (
        <ConfirmImage
          data={companyInfo}
          onConfirmComplete={() => {
            // ✅ 닫기 버튼 누를 때 처리
            setShowConfirm(false);
            setCompanyInfo(null);
          }}
          onReject={() => {
            setShowConfirm(false);
            setTurnOnCamera(true);
            setCompanyInfo(null);
          }}
        />
      )}
    </div>
  );
};

export default StoreReviewPage;
