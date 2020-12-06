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
    if (secret !== "") {
        let expires = new Date();
        expires.setTime(expires.getTime() + (60 * 60 * 1000));
        cookies.set("secret", secret, { path: "/admin-andrea", expires });

        return {
            type: LOGIN,
            payload: secret
        };

    }
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

// export const passwordIsnotSame = (text) => {
//     return {
//         type: SAME_PASSWORD,
//         payload: text
//     };
// };

// export const loginUser = (text) => {
//     const { username, password } = text;

//     return (dispatch) => {
//         firebase.database().ref('/user')
//             .on('value', snapshot => {
//                 let result = snapshot.val();
//                 console.log(result);
//                 let user = _.map(result, (val, uid) => {
//                     if (val.username === username && val.password === password)
//                         return { ...val, uid };
//                 });
//                 loginUserSuccess(dispatch, user);
//             });
//     };
// };

// const loginUserSuccess = (dispatch, user) => {
//     console.log('success');
//     dispatch({
//         type: LOGIN,
//         payload: user
//     });

//     Actions.monefy();
// };

// const loginUserFail = (dispatch) => {
//     console.log('error');
//     dispatch({ type: LOGIN_USER_FAIL });
// };

// export const logout = () => {
//     firebase.auth().signOut().then(() => {
//         Actions.login();
//     });
// };