import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Kept the destructured import as requested
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken, logout } from './authSlice';

const baseURL = "https://django-backend-f0597d367dd6.herokuapp.com/api/";

const useAxios = () => {
  const { authTokens } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Create an Axios instance
  const createAxiosInstance = (accessToken) => {
    return axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  // Function to check and refresh token if it's expired
  const checkAndRefreshToken = async (req) => {
    if (!authTokens?.access) return req; // Early exit if no access token

    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req; // Token is still valid

    try {
      // Attempt to refresh the token
      const { payload: newTokens } = await dispatch(refreshToken()).unwrap();
      req.headers.Authorization = `Bearer ${newTokens.access}`;
      return req;
    } catch (error) {
      console.error('Token refresh failed:', error);
      dispatch(logout()); // Logout user if refresh fails
    }

    return req;
  };

  const axiosInstance = createAxiosInstance(authTokens?.access);

  // Axios request interceptor to refresh token when needed
  axiosInstance.interceptors.request.use(async (req) => {
    return await checkAndRefreshToken(req);
  });

  return axiosInstance;
};

export default useAxios;
