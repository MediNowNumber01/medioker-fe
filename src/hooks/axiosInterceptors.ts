"use client";
import useAxios from "@/hooks/useAxios";
import { FC } from "react";

const AxiosInterceptor: FC = () => {
  useAxios();
  return null;
};
export default AxiosInterceptor;