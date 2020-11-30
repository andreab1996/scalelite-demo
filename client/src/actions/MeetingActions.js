
import {
    FETCH_MEETINGS,
} from './types';

const Scalelite = require('scalelite-js').ScaleliteApi
const scalelite = new Scalelite(
    "https://vcss.etfbl.net/scalelite/api/",
    "8dfcebc4b2c7faebf8ed960768c993e1bf23efc393780844"
    // process.env.SCALELITE_URL, // should be in form http://example.com/scalelite/api
    // process.env.SCALELITE_SECRET
)

export const getMeetings = (serverID) => {
    return {
        type: FETCH_MEETINGS,
        payload: { meetings: [], serverID }
    }
    // return (dispatch) => {
    //     scalelite.getServerMeetings(serverID).then((json) => {
    //         console.log(json);

    //         dispatch({
    //             type: FETCH_MEETINGS,
    //             payload: { meetings: json.meetings, serverID }
    //         })
    //     });
    // }
}
