import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@/styles/global.css";

// 화면이 로드될 때 & 리사이즈될 때마다 실제 innerHeight를 --vh로 설정
function setVh() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
}
window.addEventListener("resize", setVh);
setVh();

createRoot(document.getElementById("root")).render(<App />);
