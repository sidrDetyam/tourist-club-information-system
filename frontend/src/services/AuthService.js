import api from '../http/Api'

export async function login(username, password){
    return api.post("/auth/login", {username, password});
}
