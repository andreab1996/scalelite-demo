
import {
    FETCH_MEETINGS, INVALID_SECRET, UPDATE_REDIRECT_TO,
} from './types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Scalelite = require('scalelite-js').ScaleliteApi
// const scalelite = new Scalelite(
//     "https://vcss.etfbl.net/scalelite/api/",
//     // "8dfcebc4b2c7faebf8ed960768c993e1bf23efc393780844"
//     cookies.get('secret')
//     // process.env.SCALELITE_URL, // should be in form http://example.com/scalelite/api
//     // process.env.SCALELITE_SECRET
// )

export const getSserverMeetings = (url) => {
    let serverID = url.split("/");
    const scalelite = new Scalelite(
        "https://vcss.etfbl.net/scalelite/api/",
        cookies.get('secret')
    )
    // return {
    //     type: FETCH_MEETINGS,
    //     payload: { serverID }
    // }
    return (dispatch) => {
        scalelite.getServerMeetings(serverID).then((json) => {
            console.log(json);
            if (json.returncode !== "FAILED")
                dispatch({
                    type: FETCH_MEETINGS,
                    payload: { meetings: json.meetings, serverID }
                })
            else {
                cookies.remove("secret", { path: "/admin-andrea" });
                dispatch({
                    type: INVALID_SECRET,
                    payload: true
                })
            }
        });
    }
}

export const redirectToLogin = (redirectTo) => {
    return {
        type: UPDATE_REDIRECT_TO,
        payload: redirectTo
    }
}
