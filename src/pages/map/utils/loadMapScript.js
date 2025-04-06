export const loadNaverMapScript = () => {
  const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;
  const script = document.createElement("script");
  script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
  script.async = true;
  document.head.appendChild(script);
};
