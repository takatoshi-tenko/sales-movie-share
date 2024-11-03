import { getToken } from "@/lib/auth";
import axios, { AxiosInstance } from "axios";

export function getHTTPClient(): AxiosInstance {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_ORIGIN,
    timeout: 0,
    headers: headers,
  });
}
