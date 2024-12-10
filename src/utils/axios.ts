import axios from "npm:axios";
import { API_URL } from "../env.ts";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const updateAxiosToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
