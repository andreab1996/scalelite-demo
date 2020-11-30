
import axios from 'axios';
import {
    ADD_SERVER,
    CLOSE_ALERT,
    FETCH_MEETINGS,
    FETCH_SERVERS,
    UPDATE_SERVER
} from './types';
let sha1 = require('sha1');

const Scalelite = require('scalelite-js').ScaleliteApi
const scalelite = new Scalelite(
    "https://vcss.etfbl.net/scalelite/api/",
    "8dfcebc4b2c7faebf8ed960768c993e1bf23efc393780844"
    // process.env.SCALELITE_URL, // should be in form http://example.com/scalelite/api
    // process.env.SCALELITE_SECRET
)

export const getServers = () => {
    return (dispatch) => {
        // scalelite.getServers().then((json) => {
        //     console.log("servers = ", json.servers);
        //     let servers = json.servers;
        //     dispatch(receiveServers(json.servers))
        // })

        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((response) => dispatch(receiveServers(response.data)))
            .catch((error) => console.log(error))
    }
}

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

export const receiveServers = (data) => {
    return {
        type: FETCH_SERVERS,
        payload: data
    }
}

export const addServer = () => {
    console.log("Add Server");

    return (dispatch) => {
        scalelite
            .addServer(
                "https://vcss.etfbl.net/scalelite/api/",
                "8dfcebc4b2c7faebf8ed960768c993e1bf23efc393780844"
            )
            .then((json) => {
                let serverID = json.server.serverID;
                scalelite.enableServer(serverID);
                dispatch({
                    type: ADD_SERVER,
                    payload: { serverID, returnCode: json.returncode }
                })
            })
    }
}

export const enableServer = (serverID) => {
    console.log("enable", serverID);

    return (dispatch) => {
        scalelite.enableServer(serverID).then((json) => {
            console.log("json = ", json);
            console.log("Uspjesno enable-ovan server ID = ", serverID);
            dispatch({
                type: UPDATE_SERVER,
                payload: { serverID, returnCode: json.returncode }
            })
        });
    }
}

export const disableServer = (serverID) => {
    console.log("disable", serverID);
    // return ({
    //     type: UPDATE_SERVER,
    //     payload: { serverID: 1, returnCode: "SUCCESS" }
    // })
    return (dispatch) => {
        scalelite.disableServer(serverID).then((json) => {
            console.log("json = ", json);
            console.log("Uspjesno disable-ovan server ID = ", serverID);
            dispatch({
                type: UPDATE_SERVER,
                payload: { serverID, returnCode: json.returncode }
            })
        });
    }
}

export const deleteServer = (serverID) => {
    console.log("delete", serverID);

    return (dispatch) => {
        scalelite.removeServer(serverID).then((json) => {
            console.log("json = ", json);

            dispatch({
                type: UPDATE_SERVER,
                payload: { serverID, returnCode: json.returncode }
            })
        });
    }
}

export const closeAlert = () => {
    return {
        type: CLOSE_ALERT,
        payload: ''
    }
}
