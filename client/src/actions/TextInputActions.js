
import axios from 'axios';
import {
    ADD_SERVER,
    CLOSE_ALERT,
    DELETE_SERVER,
    DISABLE_SERVER,
    ENABLE_SERVER,
    FETCH_SERVERS,
    UPDATE_SERVER
} from './types';

const Scalelite = require('scalelite-js').ScaleliteApi
const scalelite = new Scalelite(
    "https://vcss.etfbl.net/scalelite/api/",
    "8dfcebc4b2c7faebf8ed960768c993e1bf23efc393780844"
    // process.env.SCALELITE_URL, // should be in form http://example.com/scalelite/api
    // process.env.SCALELITE_SECRET
)

export const getServers = () => {
    return (dispatch) => {
        const url = 'https://jsonplaceholder.typicode.com/todos';

        // scalelite.getServers().then((json) => {
        //     console.log("json = ", json);
        //     console.log("servers = ", json.servers);
        //     dispatch(receiveServers(json.servers))
        // })

        // let servers = fetchServers();
        // dispatch(receiveServers(servers));
        axios.get(url)
            .then((response) => dispatch(receiveServers(response.data)))
            .catch((error) => console.log(error))
    }
}

export const receiveServers = (data) => {
    return {
        type: FETCH_SERVERS,
        payload: data
    }
}

export const addServer = () => {
    console.log("add");
    return {
        type: ADD_SERVER,
        payload: "add"
    }
}

export const enableServer = (serverID) => {
    console.log("enable", serverID);

    return (dispatch) => {
        scalelite.enableServer(serverID).then((json) => {
            console.log("json = ", json);

            scalelite.getServerInfo(serverID).then((json) => {
                console.log("Server Info: ", json.server);
                console.log("Uspjesno enable-ovan server ID = ", serverID);
                let data = fetchServers();
                dispatch({
                    type: UPDATE_SERVER,
                    payload: { data, serverID, returnCode: json.returncode }
                })
            });
        });
    }
}

export const disableServer = (serverID) => {
    console.log("disable", serverID);
    // return {
    //     type: ENABLE_SERVER,
    //     payload: { data, serverID, returnCode: "SUCCESS" }
    // }
    return (dispatch) => {
        scalelite.disableServer(serverID).then((json) => {
            console.log("json = ", json);

            scalelite.getServerInfo(serverID).then((json) => {
                console.log("Server Info: ", json.server);
                console.log("Uspjesno disable-ovan server ID = ", serverID);
                let data = fetchServers();
                dispatch({
                    type: DISABLE_SERVER,
                    payload: { data, serverID, returnCode: json.returncode }
                })
            });
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

function fetchServers() {
    scalelite.getServers().then((json) => {
        console.log("json = ", json);
        console.log("servers = ", json.servers);
        return json.servers
    })
}
