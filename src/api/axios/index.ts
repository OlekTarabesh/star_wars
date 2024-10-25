import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const config: AxiosRequestConfig = {
  baseURL: baseUrl,
};

export const axiosInstance = axios.create(config);
