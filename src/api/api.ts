import axios from 'axios';
import store from '../store/index';
import { authActions } from '../store/slice/authSlice';

// We are creating an API instance. We can use an interceptor on this instance. Setting withCredentials: true means the refresh token can be stored in a cookie.
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

//The interceptor is called for every API request. For protected routes, we need to include the access token in the request. If the access token is present in local storage, it should be added to the Authorization header.
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !config.url?.endsWith('/login') && !config.url?.endsWith('/register')) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  () => {}
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; // Actual request which has failed
    const isRefreshUrl = originalRequest?.url?.includes('/auth/refresh');
    if (error?.response?.status === 401 && !originalRequest?._retry && !isRefreshUrl) {
      originalRequest._retry = true;
      try {
        const response = await api.post('/auth/refresh');
        const newAccessToken = response?.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          return api(originalRequest);
        }
      } catch (err) {
        // Dispatch logout action in case token refresh failed
        store.dispatch(authActions.logout());
        // Remove expired accessToken from localstorage if any
        localStorage.removeItem('accessToken');
        console.error('Refresh Token failed');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
