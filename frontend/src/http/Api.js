import axios from 'axios';
import {ACCESS_TOKEN_LS} from "../Consts";

export const API_BASE_URL = "http://localhost:8080"

const api = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_LS)
    if(token != null){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;