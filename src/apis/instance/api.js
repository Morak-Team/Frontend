import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default api;

export const pythonServer = axios.create({
  baseURL: import.meta.env.VITE_PYTHON_SERVER,
});
