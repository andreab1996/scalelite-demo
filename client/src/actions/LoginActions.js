import { LOGIN, PASSWORD_CHANGED, USERNAME_CHANGED } from './types';
// import { createBrowserHistory } from 'history';

// export const browserHistory = createBrowserHistory();

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

export const login = () => {
    return (dispatch) => {
        // firebase.database().ref('/user')
        //     .on('value', snapshot => {
        //         let result = snapshot.val();
        //         console.log(result);
        //         let user = _.map(result, (val, uid) => {
        //             if (val.username === username && val.password === password)
        //                 return { ...val, uid };
        //         });
        //         loginUserSuccess(dispatch, user);
        //     });
        loginUserSuccess(dispatch, "");
    };
};

const loginUserSuccess = (dispatch, user) => {
    console.log('success');
    dispatch({
        type: LOGIN,
        payload: user
    });
    // browserHistory.push('/servers');
};


// export const confirmIsPasswordSame = (text) => {
//     return {
//         type: CONFIRM_PASSWORD,
//         payload: text
//     };
// };

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