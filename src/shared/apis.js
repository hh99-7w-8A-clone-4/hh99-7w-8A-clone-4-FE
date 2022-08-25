import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI,
});

axiosInstance.defaults.headers.common["Authorization"] =
  localStorage.getItem("accessToken");

axiosInstance.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error) {
    try {
      const originalRequest = error.config;
      const requestRes = await apis.reissue(
        localStorage.getItem("refreshtoken")
      );

      localStorage.setItem("accessToken", requestRes.authorization);
      localStorage.setItem("refreshtoken", requestRes["refresh-token"]);
      originalRequest.headers["Authorization"] = requestRes.authorization;
      return await axiosInstance.request(originalRequest);
    } catch (error) {
      localStorage.removeItem("accessToken");
      return console.log(error);
    }
  }
);

export const apis = {
  reissue: async (refreshToken) => {
    const requestRes = await axiosInstance.get("/api/reissue", {
      headers: {
        "Refresh-Token": refreshToken,
      },
    });

    return requestRes.headers;
  },
  getFrind: async () => {
    try {
      const requestRes = await axiosInstance.get("/api/friends");

      return requestRes.data;
    } catch (error) {
      console.log(error);
    }
  },
};
