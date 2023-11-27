import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:3030",
};

export const server = axios.create(axiosConfig);
