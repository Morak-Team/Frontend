import api from "@apis/instance/api";

export const signup = async ({ name, location, role, profileColor }) => {
  try {
    const res = await api.post("/member/signup", {
      name,
      location,
      role,
      profileColor,
    });

    return res.data;
  } catch (err) {
    console.error("회원가입 요청 실패", err.response?.data || err.message);
    throw err;
  }
};
