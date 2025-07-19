import axios from "axios";

// We are creating an API instance. We can use an interceptor on this instance. Setting withCredentials: true means the refresh token can be stored in a cookie.
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

//The interceptor is called for every API request. For protected routes, we need to include the access token in the request. If the access token is present in local storage, it should be added to the Authorization header.

api.interceptors.request.use(
  (config) => {
    console.log(config);
    const accessToken = localStorage.getItem("accessToken");
    if (
      accessToken &&
      !config.url?.endsWith("/login") &&
      !config.url?.endsWith("/register")
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  () => {}
);
export default api;
