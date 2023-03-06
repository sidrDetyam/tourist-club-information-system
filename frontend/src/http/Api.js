import axios from 'axios';

export const API_BASE_URL = "http://localhost:8080"

const api = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL
})

api.interceptors.request.use((config) => {
    console.log(config)
    const token = localStorage.getItem('token')
    if(token != null){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;