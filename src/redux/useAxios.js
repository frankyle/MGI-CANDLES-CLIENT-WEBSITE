import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken, logout } from './authSlice';

const baseURL = "https://django-backend-4b31f4dd2c54.herokuapp.com/api/";

const useAxios = () => {
  const { authTokens } = useSelector((state) => state.auth); // Access auth state
  const dispatch = useDispatch();

  // Create an Axios instance
  const createAxiosInstance = (accessToken) => {
    return axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${accessToken}`, // Attach access token to headers
      },
    });
  };

  // Check if the token is expired and refresh if necessary
  const checkAndRefreshToken = async (req) => {
    if (!authTokens?.access) return req; // If no token, proceed as is

    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // Check token expiration

    if (!isExpired) return req; // If not expired, continue the request as normal

    try {
      // Refresh the token using the refreshToken thunk
      const { payload: newTokens } = await dispatch(refreshToken()).unwrap();
      req.headers.Authorization = `Bearer ${newTokens.access}`; // Attach the new access token
      return req;
    } catch (error) {
      console.error('Token refresh failed:', error);
      dispatch(logout()); // Logout if the token refresh fails
      return Promise.reject(error); // Reject the request if the refresh fails
    }
  };

  const axiosInstance = createAxiosInstance(authTokens?.access);

  // Axios interceptor to check and refresh token before every request
  axiosInstance.interceptors.request.use(async (req) => {
    return await checkAndRefreshToken(req); // Attach refreshed token if necessary
  });

  return axiosInstance; // Return the customized Axios instance
};

export default useAxios;
