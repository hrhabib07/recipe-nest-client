import axios from "axios";

import { envConfig } from "@/src/config/envConfig";

export const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});
