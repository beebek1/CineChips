import axios from "axios";

const ApiFormData = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type":"multipart/form-data",
    },
});

const Api = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type" : "application/json"
    },
});

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
};

export const registerApi = (data) => Api.post("/api/auth/register", data);

export const  loginApi = (data) =>Api.post("/api/auth/login", data);
 
export const getUser = (params) => Api.get("api/auth/get-user", {params});

export const addMovieApi = (data) => ApiFormData.post("api/movie/addmovie", data, config)