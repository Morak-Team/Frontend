export const openNaverMapRoute = ({
  slat,
  slng,
  sname,
  dlat,
  dlng,
  dname,
  appName,
}) => {
  const url = `nmap://route/walk?slat=${slat}&slng=${slng}&sname=${encodeURIComponent(
    sname,
  )}&dlat=${dlat}&dlng=${dlng}&dname=${encodeURIComponent(
    dname,
  )}&appname=${"com.sesac.morak"}`;

  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);

  if (isIOS) {
    const clickedAt = +new Date();
    window.location.href = url;

    setTimeout(() => {
      if (+new Date() - clickedAt < 2000) {
        window.location.href = "https://apps.apple.com/app/id311867728";
      }
    }, 1000);
  } else if (isAndroid) {
    window.location.href = `intent://route/walk?slat=${slat}&slng=${slng}&sname=${encodeURIComponent(
      sname,
    )}&dlat=${dlat}&dlng=${dlng}&dname=${encodeURIComponent(
      dname,
    )}&appname=${"com.sesac.morak"}#Intent;scheme=nmap;package=com.nhn.android.nmap;end`;
  } else {
    window.open(`https://map.naver.com/v5/search/${dname}`, "_blank");
  }
};
