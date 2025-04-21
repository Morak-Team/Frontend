import api from "@/apis/instance/api";

// 임시 url을 가져오는 함수이므로 캐싱이 의미가 없어 tanstack query로는 작성하지 않음.
const getPresignedUrl = async () => {
  const res = await api.get("/getUrl");
  return res.data;
};
