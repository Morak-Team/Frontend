export const loadNaverMapScript = () => {
  return new Promise((resolve, reject) => {
    if (window.naver && window.naver.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector("#naver-map-script");
    if (existingScript) {
      existingScript.onload = () => resolve();
      return;
    }

    const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;
    const script = document.createElement("script");
    script.id = "naver-map-script";
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject("네이버 지도 스크립트 로드 실패");

    document.head.appendChild(script);
  });
};
