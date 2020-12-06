import { CHECK_COOKIES, LOGIN, LOGOUT, NO_SECRET, PASSWORD_CHANGED, USERNAME_CHANGED } from './types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const usernameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const checkCookies = () => {
    console.log(cookies.get("secret"));
    return {
        type: CHECK_COOKIES,
        payload: cookies.get("secret")
    };
}
// 8dfcebc4b2c7faebf8ed960768c993e1bf23efc393780844
export const login = (secret) => {
    if (secret !== "")
        return {
            type: LOGIN,
            payload: secret
        };

    return {
        type: NO_SECRET,
        payload: "Please enter a valid secret key."
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload: ""
    };
};

export const noSecret = () => {
    return {
        type: NO_SECRET,
        payload: "Please enter a valid secret key."
    };
};