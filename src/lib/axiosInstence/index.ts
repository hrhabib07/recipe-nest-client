import { envConfig } from "@/src/config/envConfig";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});
