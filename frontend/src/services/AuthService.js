import api from '../http/Api'
import {ACCESS_TOKEN_LS, REFRESH_TOKEN_LS} from "../Consts";
import {useDispatch} from "react-redux";

const LOGIN_URL = "/auth/login"

export async function login(username, password) {
    try{
        const response = await api.post(LOGIN_URL, {username, password})
        const {accessToken, refreshToken} = response.data
        localStorage.setItem(ACCESS_TOKEN_LS, accessToken)
        localStorage.setItem(REFRESH_TOKEN_LS, refreshToken)
        return true;
    }
    catch (error){
        console.log(error)
        return false;
    }
}

