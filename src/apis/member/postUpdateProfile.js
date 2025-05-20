import api from "@/apis/instance/api";

export const postUpdateProfile = async ({ name, location, profileColor }) => {
  const response = await api.post("/member/update", {
    name,
    location,
    profileColor,
  });
  return response.data;
};
