import { CHECK_COOKIES, LOGIN, NO_SECRET, PASSWORD_CHANGED, USERNAME_CHANGED } from '../actions/types';

const INITIAL_STATE = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    samePassword: '',
    registration: false,
    user: {},
    loginError: '',
    loading: false,
    redirectTo: null,
    hasCookies: false,
    error: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERNAME_CHANGED:
            return { ...state, username: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN:
            return { ...state, redirectTo: '/admin-andrea/servers', hasCookies: true, error: false };
        case CHECK_COOKIES:
            return { ...state, hasCookies: action.payload, redirectTo: action.payload ? '/admin-andrea/servers' : null }
        case NO_SECRET:
            return { ...state, error: action.payload }
        default:
            return INITIAL_STATE;
    }
};