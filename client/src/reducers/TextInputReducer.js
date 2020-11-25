import {
    ADD_SERVER,
    CLOSE_ALERT,
    DELETE_SERVER,
    FETCH_SERVERS,
    UPDATE_SERVER
} from '../actions/types';

const INITIAL_STATE = { data: [], update: '' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SERVERS:
            // let servers = [{
            //     enabled: true,
            //     load: 0,
            //     loadMultiplier: 1,
            //     online: true,
            //     serverID: "3cf4fcbf-950a-4f02-9068-a0f0120bc59e",
            //     serverUrl: "https://vcs3.etfbl.net/bigbluebutton/api/",
            // }, {
            //     enabled: true,
            //     load: 0,
            //     loadMultiplier: 1,
            //     online: true,
            //     serverID: "87abb152-634a-4565-812a-80d4e1391439",
            //     serverUrl: "https://vcs1.etfbl.net/bigbluebutton/api/",
            // }];
            let servers = action.payload;
            state.data = servers.map(s => {
                return { ...s, expandable: false, action: "Actions" }
            })
            return { ...state };
        case ADD_SERVER:
            return { ...state, update: "SUCCESS_CREATE" };;
        case UPDATE_SERVER:
            let { serverID, returnCode } = action.payload;
            return { ...state, update: returnCode };
        case DELETE_SERVER:
            console.log(action.payload)
            return state;
        case CLOSE_ALERT:
            return { ...state, update: action.payload };
        default:
            return state;
    }
};