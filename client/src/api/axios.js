import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN SENT 👉", token); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized globally
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default instance;
