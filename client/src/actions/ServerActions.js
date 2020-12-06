
import axios from 'axios';
import {
    ADD_SERVER,
    CLOSE_ALERT,
    FETCH_MEETINGS,
    FETCH_SERVERS,
    INVALID_SECRET,
    SET_INITIAL_STATE,
    SHOW_MESSAGE,
    UPDATE_REDIRECT_TO,
    UPDATE_SERVER
} from './types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Scalelite = require('scalelite-js').ScaleliteApi
// const scalelite = new Scalelite(
//     "https://vcss.etfbl.net/scalelite/api/",
//     cookies.get('secret')
// )

// console.log("scalelite ==== ", scalelite);

export const getServers = () => {
    const scalelite = new Scalelite(
        "https://vcss.etfbl.net/scalelite/api/",
        cookies.get("secret")
    )
    console.log("==================", scalelite)
    return (dispatch) => {
        // scalelite.getServers().then((json) => {
        //     console.log("servers = ", json);

        //     if (json.returncode !== "FAILED")
        //         dispatch(receiveServers(json.servers));
        //     else {
        //         cookies.remove("secret", { path: "/admin-andrea" });
        //         console.log("#################################", cookies.get("secret"));
        //         dispatch(invalidSecret(true));
        //     }
        // })

        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((response) => dispatch(receiveServers(response.data)))
            .catch((error) => console.log(error))
    }
}

export const getMeetings = (serverID) => {
    return {
        type: FETCH_MEETINGS,
        payload: { serverID }
    }
}

export const receiveServers = (data) => {
    return {
        type: FETCH_SERVERS,
        payload: data
    }
}

export const invalidSecret = (invalid) => {
    return {
        type: INVALID_SECRET,
        payload: invalid
    }
}

export const addServer = () => {
    console.log("Add Server");
    const scalelite = new Scalelite(
        "https://vcss.etfbl.net/scalelite/api/",
        cookies.get('secret')
    )

    return (dispatch) => {
        scalelite.addServer(
            "https://vcss.etfbl.net/scalelite/api/",
            "8dfcebc4b2c7faebf8ed960768c993e1bf23efc393780844"
        ).then((json) => {
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
    const scalelite = new Scalelite(
        "https://vcss.etfbl.net/scalelite/api/",
        cookies.get('secret')
    )

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
    const scalelite = new Scalelite(
        "https://vcss.etfbl.net/scalelite/api/",
        cookies.get('secret')
    )
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
    const scalelite = new Scalelite(
        "https://vcss.etfbl.net/scalelite/api/",
        cookies.get('secret')
    )

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

export const showInfoMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    }
}

export const updateRedirectTo = (redirectTo) => {
    return {
        type: UPDATE_REDIRECT_TO,
        payload: redirectTo
    }
}