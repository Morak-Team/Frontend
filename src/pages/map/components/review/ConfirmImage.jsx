import { useNavigate } from "react-router-dom";

import { loadNaverMapScript } from "@/pages/map/utils/loadMapScript";
import { useEffect, useRef, useState } from "react";
import DatePickerSheet from "@/pages/map/components/picker/DatePickerSheet";
import TimePickerSheet from "@/pages/map/components/picker/TimePickerSheet";
import { AnimatePresence } from "framer-motion";
import { formatDateTime } from "@/pages/map/utils/formatDateTime";
import { usePaymentStore } from "@/store/paymentStore";
import { getDistanceDiff } from "@/pages/map/utils/getDistanceDiff";
import { formatToYMDHMS } from "@/store/paymentStore";

const ConfirmImage = ({ onReject, data, onConfirmComplete }) => {
  const navigate = useNavigate();
  // 이 화면에서 넘겨야 할 것 -> 시간 정보, 결제승인번호
  const setReviewInfo = usePaymentStore((s) => s.setReviewInfo);
  const { companyId } = usePaymentStore();

  const moveToReviewPage = () => {
    onConfirmComplete?.();
  };

  // const handleClick = () => {
  //   const newDate = new Date(/* year, month-1, day, hour, minute */);
  //   setPaymentTime(newDate);

  //   navigate("/writereview");
  // };

  const handleClick = () => {
    const pad = (n) => String(n).padStart(2, "0");

    const extractNumber = (str) => parseInt(str.replace(/\D/g, ""), 10); // 숫자만 추출

    const hour24 =
      selectedTime.period === "오후"
        ? (extractNumber(selectedTime.hour) % 12) + 12
        : extractNumber(selectedTime.hour) % 12;

    const rawDateStr = `2025/${pad(extractNumber(selectedDate.month))}/${pad(extractNumber(selectedDate.day))} ${pad(hour24)}:${pad(extractNumber(selectedTime.minute))}:00`;

    const dateObj = new Date(rawDateStr);

    if (isNaN(dateObj.getTime())) {
      console.warn("❌ Invalid constructed date", rawDateStr);
      return;
    }

    setReviewInfo({
      paymentInfoTime: formatToYMDHMS(dateObj),
      paymentInfoConfirmNum: data.confirmNumber,
    });

    navigate("/writereview");
  };

  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const mapInstanceRef = useRef(null);

  const [showPickerType, setShowPickerType] = useState(null); // null, "date", "time"

  // 방문 날짜/시간 상태 (빈값으로 초기화)
  const [selectedDate, setSelectedDate] = useState({ month: "", day: "" });
  const [selectedTime, setSelectedTime] = useState({
    period: "",
    hour: "",
    minute: "",
  });

  // data.orderDateTime이 들어오면 파싱해서 상태 셋팅
  useEffect(() => {
    if (data?.orderDateTime) {
      const { date, time } = formatDateTime(data.orderDateTime);
      setSelectedDate(date);
      setSelectedTime(time);
    }
  }, [data?.orderDateTime]);

  // 현재 위치 가져오기
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

  // 지도 로드 및 마커 표시
  useEffect(() => {
    if (!location) return;

    let mounted = true;
    setIsMapLoading(true);

    loadNaverMapScript()
      .then(() => {
        if (!mounted) return;

        const naverLocation = new window.naver.maps.LatLng(
          data.location.latitude,
          data.location.longitude
        );

        const map = new window.naver.maps.Map(mapRef.current, {
          center: naverLocation,
          zoom: 16,
        });

        mapInstanceRef.current = map;

        new window.naver.maps.Marker({
          position: naverLocation,
          map,
          icon: {
            url: "/svgs/review/pinIcon.svg",
            size: new window.naver.maps.Size(26, 26),
            scaledSize: new window.naver.maps.Size(26, 26),
            anchor: new window.naver.maps.Point(13, 26),
          },
        });

        window.naver.maps.Event.once(map, "init", () => {
          setTimeout(() => {
            map.setCenter(naverLocation);
            map.refresh();
            setIsMapLoading(false);
          }, 0);
        });
      })
      .catch((error) => {
        console.error("지도 로딩 실패:", error);
        setIsMapLoading(false);
      });

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [location]);

  return (
    <div
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      className="fixed min-h-screen inset-0 z-[9999] pt-7 bg-white flex flex-col mx-auto overflow-y-auto pb-10 justify-center items-center"
    >
      <div className="flex justify-end w-full mt-14 sm:mt-32 pr-5">
        <img
          src="/svgs/review/xIcon.svg"
          className="w-8 h-8 mt-5"
          onClick={() => onConfirmComplete()}
        />
      </div>

      <div className="mt-6 mb-14">
        <p className="text-xl font-bold mb-6 text-center">
          <span className="h2 text-primary-8">{data?.storeName}</span>
          <span className="h2 text-gray-12">에 다녀오셨군요!</span>
        </p>
      </div>

      <div className="mt-3 mb-3 text-center">
        <p className="b5 text-gray-9">이때 방문하신 것이 맞나요?</p>
      </div>

      <div className="flex gap-2 w-full justify-center items-center">
        <div className="w-40 h-16 sm:w-72 bg-gray-2 rounded-md flex justify-center items-center gap-8">
          <p className="b1 text-gray-12">
            {selectedDate?.month} {selectedDate?.day}
          </p>
          <button
            className="b4 text-primary-8"
            onClick={() => setShowPickerType("date")}
          >
            수정
          </button>
        </div>
        <div className="w-40 h-16 sm:w-72 bg-gray-2 rounded-md flex justify-center items-center gap-4">
          <p className="b1 text-gray-12">
            {selectedTime?.period} {selectedTime?.hour} {selectedTime?.minute}
          </p>
          <button
            className="b4 text-primary-8"
            onClick={() => setShowPickerType("time")}
          >
            수정
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showPickerType === "date" && (
          <DatePickerSheet
            initialMonth={selectedDate.month}
            initialDay={selectedDate.day}
            onClose={() => setShowPickerType(null)}
            onConfirm={({ month, day }) => {
              setSelectedDate({ month, day });
            }}
          />
        )}

        {showPickerType === "time" && (
          <TimePickerSheet
            initialPeriod={selectedTime.period}
            initialHour={selectedTime.hour}
            initialMinute={selectedTime.minute}
            onClose={() => setShowPickerType(null)}
            onConfirm={({ period, hour, minute }) => {
              setSelectedTime({ period, hour, minute });
            }}
          />
        )}
      </AnimatePresence>

      <div className="mt-8 mb-3 text-center">
        <p className="b5 text-gray-9">이곳이 맞나요?</p>
      </div>

      {/* 지도 표시 영역 */}
      <div className="w-full">
        <div className="relative w-80 sm:w-[77%] h-32 mx-auto">
          {isMapLoading && (
            <div className="absolute inset-0 z-10 rounded-md border bg-gray-100 animate-pulse" />
          )}
          <div ref={mapRef} className="w-full h-full rounded-md border" />
        </div>
      </div>

      <div className="w-80 h-24 bg-gray-2 px-5 py-4 flex flex-col gap-2 mt-2 sm:w-[77%]">
        <div className="flex gap-2 justify-start items-center">
          <p className="h3 text-gray-12">{data?.storeName}</p>
          <p className="b4 text-gray-6">{data?.companyCategory ?? "기타"}</p>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <p className="b4 text-gray-12">
            {location
              ? getDistanceDiff(
                  location.latitude,
                  location.longitude,
                  data.location.latitude,
                  data.location.longitude
                )
              : "0m"}
          </p>
          <p className="b6 text-gray-12">{data.storeAddress}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-center items-center mt-14 w-full">
        <button
          onClick={handleClick}
          className="px-6 py-3 border border-black rounded-md b1 text-gray-0 bg-primary-8 w-80 h-12 sm:w-[77%]"
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
