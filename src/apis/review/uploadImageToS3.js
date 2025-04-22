import axios from "axios";

export const uploadImageToS3 = async (url, file) => {
  const res = await axios.put(url, file, {
    headers: {
      "Content-Type:": file.type,
    },
  });

  if (res.status !== 200) {
    throw new Error("S3 업로드에 실패했습니다.");
  }

  return true;
};
