// api.ts
import axios from "axios";
import BASE_URL from "./config";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Endpoints
export const signup = (data: any) => API.post("/signup", data);
export const verifyEmail = (token: string) => API.get(`/signup/verify?token=${token}`);
export const login = (data: any) => API.post("/login", data);

export default API;
