import { NEXT_PUBLIC_BASE_URL_API } from "@/config/env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_BASE_URL_API,
});
