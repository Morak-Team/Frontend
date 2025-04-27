import api from "@apis/instance/api";

export const signup = async ({ name, location, role, profileImageUrl }) => {
  try {
    const res = await api.post("/member/signup", {
      name,
      location,
      role,
      profileImageUrl,
    });

    return res.data;
  } catch (err) {
    console.error("회원가입 요청 실패", err.response?.data || err.message);
    throw err;
  }
};
