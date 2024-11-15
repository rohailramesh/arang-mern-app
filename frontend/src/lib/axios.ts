import axios from "axios";

//creating an instance of axios to make different requests like GET, POST, DELETE, etc from backend server

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:5001" : "/api",
});
//if env mode is in development use localhost/5001 else '/api'
