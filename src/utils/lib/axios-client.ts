import axios from "axios";
import queryString from "query-string";
import { TDotEnv } from "../constants/dotenv";

// Get access token
const ISSERVER = typeof window === "undefined";
let tetochaAccessToken = "";
// if (!ISSERVER) {
//   if (!tetochaAccessToken) {
//     tetochaAccessToken = sessionStorage.getItem('tetochaAccessToken')
//   }
// }

// Set up default config for http requests here
export const axiosClient = axios.create({
  baseURL: TDotEnv.API_ENDPOINT_URL,

  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + "",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Handle request
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

// Handle response
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////

// Set up default config for http requests here
export const axiosClientFormData = axios.create({
  baseURL: TDotEnv.API_ENDPOINT_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + tetochaAccessToken,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Handle request
axiosClientFormData.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

// Handle response
axiosClientFormData.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);
