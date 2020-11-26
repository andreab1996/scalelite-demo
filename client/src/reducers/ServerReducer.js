import {
    ADD_SERVER,
    CLOSE_ALERT,
    DELETE_SERVER,
    FETCH_SERVERS,
    UPDATE_SERVER
} from '../actions/types';
import { StatusCode } from '../util/StatusCode';

const INITIAL_STATE = { data: [], update: '', type: '' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SERVERS:
            let servers = [{
                enabled: true,
                load: 0,
                loadMultiplier: 1,
                online: true,
                serverID: "3cf4fcbf-950a-4f02-9068-a0f0120bc59e",
                serverUrl: "https://vcs3.etfbl.net/bigbluebutton/api/",
            }, {
                enabled: true,
                load: 0,
                loadMultiplier: 1,
                online: true,
                serverID: "87abb152-634a-4565-812a-80d4e1391439",
                serverUrl: "https://vcs1.etfbl.net/bigbluebutton/api/",
            }];
            // let servers = action.payload;
            state.data = servers.map(s => {
                return { ...s, expandable: false, action: "Actions" }
            })
            return { ...state };
        case ADD_SERVER:
            state.type = action.payload.returnCode === StatusCode.success ? StatusCode.success : StatusCode.error;
            return { ...state, update: action.payload.returnCode === StatusCode.success ? StatusCode.successCreate : StatusCode.error };
        case UPDATE_SERVER:
            let { serverID, returnCode } = action.payload;
            state.type = returnCode === StatusCode.success ? StatusCode.success : StatusCode.error
            return { ...state, update: returnCode === StatusCode.success ? StatusCode.successUpdate : StatusCode.error };
        case DELETE_SERVER:
            state.type = returnCode === StatusCode.successCreate ? "succes" : "error";
            return { ...state, update: returnCode === StatusCode.success ? StatusCode.successDelete : StatusCode.error };
        case CLOSE_ALERT:
            return { ...state, update: action.payload, type: action.payload };
        default:
            return state;
    }
};