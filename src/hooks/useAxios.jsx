import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: `https://echoverse-server-1.onrender.com`
    baseURL: `http://localhost:3000`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;