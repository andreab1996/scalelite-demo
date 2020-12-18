import Cookies from 'universal-cookie';
import { CHECK_COOKIES, LOGIN, LOGOUT, NO_SECRET, SECRET_KEY_CHANGED } from '../actions/types';
const cookies = new Cookies();

const INITIAL_STATE = {
    secretKey: '',
    redirectTo: null,
    hasCookies: false,
    error: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SECRET_KEY_CHANGED:
            return { ...state, secretKey: action.payload };
        case LOGIN:
            let expires = new Date();
            expires.setTime(expires.getTime() + (60 * 60 * 1000));
            cookies.set("secret", action.payload, { path: "/admin-andrea", expires });
            return { ...state, redirectTo: '/admin-andrea/servers', hasCookies: true, error: false };
        case LOGOUT:
            cookies.remove("secret");
            return INITIAL_STATE;
        case CHECK_COOKIES:
            return { ...state, hasCookies: action.payload ? true : false, redirectTo: action.payload ? '/admin-andrea/servers' : null }
        case NO_SECRET:
            console.log("has secret = ", state.hasCookies)
            return { ...state, error: action.payload, hasCookies: false, redirectTo: null };
        default:
            return INITIAL_STATE;
    }
};