import { useParams } from "react-router-dom";
import { useState } from "react";

import PlaceInfo from "@/pages/review/components/PlaceInfo";
import { useNavigate } from "react-router-dom";
import useUIStore from "@/store/uiStore";

import ReviewImageCapture from "@/pages/map/components/ReviewImageCapture";
import ConfirmImage from "@/pages/map/components/ConfirmImage";
import Reviews from "@/pages/review/components/Reviews";

const StoreReviewPage = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();

  const [showConfirm, setShowConfirm] = useState(false);

  const { turnOnCamera, setTurnOnCamera } = useUIStore();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pt-14 mx-5 items-center">
        <img
          src="/svgs/storeReview/backIcon.svg"
          className="w-8 h-8"
          onClick={() => navigate(-1)}
        />
      </div>

      <PlaceInfo />

      <div className="w-full h-2 bg-gray-3 mt-5" />

      <div className="p-5">
        <Reviews setTurnOnCamera={setTurnOnCamera} companyId={companyId} />
      </div>

      {turnOnCamera && (
        <ReviewImageCapture
          companyId={companyId}
          turnOnCamera={turnOnCamera}
          onCloseCamera={() => setTurnOnCamera(false)}
          onCaptureSuccess={() => {
            setTurnOnCamera(false);
            setShowConfirm(true);
          }}
        />
      )}

      {showConfirm && (
        <ConfirmImage
          onReject={() => {
            sessionStorage.removeItem("reviewResult");
            setShowConfirm(false);
            setTurnOnCamera(true);
          }}
        />
      )}
    </div>
  );
};

export default StoreReviewPage;
