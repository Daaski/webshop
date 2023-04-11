import {$host, $authHost} from "@/http/index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password) => {
    const {token} = await $host.post('api/user/registration', {json: {email, password, role: "ADMIN"}}).json()
    localStorage.setItem('token', token)
    return jwtDecode(token)
}

export const login = async (email, password) => {
    const {token} = await $host.post('api/user/login', {json: {email, password}}).json();
    localStorage.setItem('token', token)
    return jwtDecode(token)
}

export const check = async () => {
    const {token} = await $authHost.get('api/user/auth').json();
    localStorage.setItem('token', token)
    return jwtDecode(token)
}