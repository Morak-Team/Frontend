import api from "@apis/instance/api";

export const signup = async ({ name, location, role, profileImageUrl }) => {
  const res = await api.post("/member/signup", {
    name,
    location,
    role,
    profileImageUrl,
  });

  return res.data;
};
