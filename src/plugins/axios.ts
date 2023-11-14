/**
 * plugins/axios.ts
 */

import axios, { type AxiosRequestConfig, type AxiosStatic } from "axios";
import router from "@/router";

export interface AxiosStaticWithAvoidance extends AxiosStatic {
  _avoidToast: boolean;
}

export interface AxiosRequestConfigWithAvoidance extends AxiosRequestConfig {
  avoidToast?: boolean;
}

const ax = axios.create({
  baseURL: "https://privateuploader.com/api/v3",
  headers: {
    Authorization: localStorage.getItem("token"),
    Accept: "application/json",
    "X-TPU-Client": "Schedule24",
    "X-TPU-Client-Version": "1.0.0"
  }
}) as AxiosStaticWithAvoidance;

ax.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

/*
ax.interceptors.request.use((config) => {
  if (config.url.includes("/gallery/site")) {
    return config;
  } else {
    return Promise.reject(config);
  }
});
*/
export default ax;
