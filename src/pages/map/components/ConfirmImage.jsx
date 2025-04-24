import { useNavigate } from "react-router-dom";
import { loadNaverMapScript } from "@/pages/map/utils/loadMapScript";
import { useEffect, useRef, useState } from "react";

const ConfirmImage = ({ onReject }) => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("현재 위치를 가져오는데 실패했습니다:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    loadNaverMapScript()
      .then(() => {
        const naverLocation = new window.naver.maps.LatLng(
          location.latitude,
          location.longitude
        );

        const map = new window.naver.maps.Map(mapRef.current, {
          center: naverLocation,
          zoom: 16,
        });

        new window.naver.maps.Marker({
          position: naverLocation,
          map,
          icon: {
            url: "/svgs/review/pinIcon.svg",
            size: new window.naver.maps.Size(26, 26),
            scaledSize: new window.naver.maps.Size(26, 26),
            anchor: new window.naver.maps.Point(26, 26),
          },
        });

        window.naver.maps.Event.once(map, "init", () => {
          setTimeout(() => {
            map.setCenter(naverLocation);
            map.refresh();
          }, 0);
        });
      })
      .catch((error) => {
        console.error("지도 로딩 실패:", error);
      });
  }, [location]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col max-w-[760px] mx-auto overflow-y-auto pb-10 justify-center items-center">
      <div className="flex justify-end w-full mt-14 pr-5">
        <img src="/svgs/review/xIcon.svg" className="w-8 h-8" />
      </div>

      <div className="mt-6 mb-14">
        <p className="text-xl font-bold mb-6 text-center">
          <span className="h2 text-orange-500">{"이 장소"}</span>
          <span className="h2 text-gray-12">에 다녀오셨군요!</span>
        </p>
      </div>

      <div className="mt-3 mb-3 text-center">
        <p className="b5 text-gray-9">이때 방문하신 것이 맞나요?</p>
      </div>

      <div className="flex gap-2 w-full justify-center items-center">
        <div className="w-40 h-16 sm:w-72 bg-gray-2 rounded-md flex justify-center items-center gap-8">
          <p className="b1 text-gray-12">2월 14일</p>
          <button className="b4 text-orange-500">수정</button>
        </div>
        <div className="w-40 h-16 sm:w-72 bg-gray-2 rounded-md flex justify-center items-center gap-8">
          <p className="b1 text-gray-12">오전 11: 45</p>
          <button className="b4 text-orange-500">수정</button>
        </div>
      </div>

      <div className="mt-8 mb-3 text-center">
        <p className="b5 text-gray-9">이곳이 맞나요?</p>
      </div>

      {/* 지도 표시 영역 */}
      <div
        ref={mapRef}
        className="w-80 sm:w-[77%] h-32 rounded-md mx-auto border"
      />

      <div className="w-80 h-24 bg-gray-2 px-5 py-4 flex flex-col gap-2 mt-2">
        <div className="flex gap-2 justify-start items-center">
          <p className="h3 text-gray-12">태백농협하나로마트</p>
          <p className="b4 text-gray-6">쇼핑</p>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <p className="b4 text-gray-12">541m</p>
          <p className="b6 text-gray-12">강원도 태백시 번영로 254</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-center items-center mt-14">
        <button
          onClick={() => navigate("/write-review")}
          className="px-6 py-3 border border-black rounded-md b1 text-gray-0 bg-orange-500 w-80 h-12 sm:w-[77%]"
        >
          맞아요
        </button>
        <button
          onClick={onReject}
          className="px-6 py-3 border border-black rounded-md b1 text-gray-12 bg-gray-0 w-80 h-12 sm:w-[77%]"
        >
          아니에요
        </button>
      </div>
    </div>
  );
};

export default ConfirmImage;
