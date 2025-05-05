import { pythonServer } from "@/apis/instance/api";

export const postUserInfo = async (userInfo) => {
  try {
    const res = await pythonServer.post("/recommend", userInfo);
    return res.data;
  } catch (e) {
    console.log("error on post userInfo", e);
    throw e;
  }
};
