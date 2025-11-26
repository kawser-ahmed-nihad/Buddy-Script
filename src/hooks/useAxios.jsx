import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://buddy-script-server-cke6.onrender.com`
    // baseURL: `http://localhost:3000`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;