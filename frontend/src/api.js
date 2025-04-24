import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:5000/api" : "/api", // In production, same domain
});

export default api;
