import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosSecure = axios.create({
  baseURL: `https://echoverse-server-1.onrender.com`,
});

const useAxiosSecure = () => {
  const auth = getAuth();

  axiosSecure.interceptors.request.use(
    async (config) => {
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
