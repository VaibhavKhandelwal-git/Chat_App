import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, response = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(response);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          await axiosInstance.post("/auth/refresh");
          processQueue(null, axiosInstance(originalRequest));
          resolve(axiosInstance(originalRequest));
        } catch (refreshError) {
          processQueue(refreshError, null);
          reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  }
);
