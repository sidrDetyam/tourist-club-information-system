import axios from 'axios';
import {ACCESS_TOKEN_LS, REFRESH_TOKEN_LS} from "../Consts";

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

api.interceptors.response.use(config => config, async (error) => {
    const originalConfg = error.config
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalConfg._isRetry = true
        try{
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`,
                {refreshToken: localStorage.getItem(REFRESH_TOKEN_LS)})
            localStorage.setItem(ACCESS_TOKEN_LS, response.data.accessToken)
            return api.request(originalConfg)
        }
        catch (e){
            console.log("Not auth")
        }
    }
})

export default api;