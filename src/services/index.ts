/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "../config/api";
import { storage } from "../storage";

const axios = Axios.create({
    baseURL: API_URL
});

async function authRequestInterceptor(config: AxiosRequestConfig) {
    return storage
        .getToken()
        .then((token) => {
            if (config.headers === undefined) return config;
            config.headers.Accept = "application/json";

            if (token === null) return config;
            config.headers.authorization = `Bearer ${token}`;

            return config;
        })
        .catch(console.error);
}

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            await storage.removeToken();
        }
        return Promise.reject(error);
    }
);

export default axios;
