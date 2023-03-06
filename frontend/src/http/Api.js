import axios from 'axios';

export const API_BASE_URL = "http://localhost:8080"

const api = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token')
    if(token != null){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;