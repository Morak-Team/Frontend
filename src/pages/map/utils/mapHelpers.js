export const createMarkerIcon = (isHighlighted, isFavorite) => {
  const size = isHighlighted
    ? new window.naver.maps.Size(64, 64)
    : new window.naver.maps.Size(48, 48);

  const anchor = isHighlighted
    ? new window.naver.maps.Point(32, 64)
    : new window.naver.maps.Point(24, 48);

  const url = isHighlighted
    ? isFavorite
      ? "/svgs/map/Ic_Pin_Pink.svg"
      : "/svgs/map/Ic_Pin_Orange.svg"
    : isFavorite
      ? "/svgs/map/Ic_Marker_Pink.svg"
      : "/svgs/map/Ic_Marker_Orange.svg";

  return { url, size, scaledSize: size, anchor };
};

export const createUserMarkerIcon = () => ({
  content:
    '<div style="width:20px;height:20px;background:#35ABFF;border-radius:9999px;filter:drop-shadow(0px 0px 12px rgba(53, 171, 255, 0.71))"></div>',
  anchor: new window.naver.maps.Point(10, 10),
});
