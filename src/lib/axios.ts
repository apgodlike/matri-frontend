import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "http://192.168.29.126:3010",
});
