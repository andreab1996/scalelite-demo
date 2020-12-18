import Cookies from 'universal-cookie';
import { CHECK_COOKIES, LOGIN, LOGOUT, NO_SECRET, SECRET_KEY_CHANGED } from './types';
const cookies = new Cookies();

export const secretKeyChanged = (text) => {
    return {
        type: SECRET_KEY_CHANGED,
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