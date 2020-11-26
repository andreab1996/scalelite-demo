import { LOGIN, PASSWORD_CHANGED, USERNAME_CHANGED } from '../actions/types';

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
    redirectTo: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERNAME_CHANGED:
            return { ...state, username: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN:
            return { ...state, redirectTo: '/admin-andrea/servers' };
        default:
            return INITIAL_STATE;
    }
};