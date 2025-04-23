import api from "@/apis/instance/api";

// 임시 url을 가져오는 함수이므로 캐싱이 의미가 없어 tanstack query로는 작성하지 않음.
export const getPresignedUrl = async (originalFileName, type, kakaoId) => {
  try {
    const res = await api.get("/files/presigned-url", {
      params: {
        originalFileName: originalFileName,
        type: type,
        kakaoId: kakaoId,
      },
    });
    return res.data;
  } catch (error) {
    console.log("pre-signed url fetching error!");
    throw error; // 호출한 쪽에서도 에러 처리 가능하도록 throw
  }
};
