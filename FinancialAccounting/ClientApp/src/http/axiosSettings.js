import axios from "axios";
import Cookies from 'js-cookie';

const axiosAuth = axios.create({});

axiosAuth.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${Cookies.get("AuthenticationToken")}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {
    axiosAuth
}