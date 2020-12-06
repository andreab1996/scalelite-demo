import sortBy from "lodash/sortBy";
import {
    ADD_SERVER,
    CLOSE_ALERT,
    DELETE_SERVER,
    FETCH_MEETINGS,
    FETCH_SERVERS,
    INVALID_SECRET,
    SHOW_MESSAGE,
    UPDATE_REDIRECT_TO,
    UPDATE_SERVER
} from '../actions/types';
import { StatusCode } from '../util/StatusCode';

const INITIAL_STATE = { data: [], update: '', type: '', redirectTo: null, message: '', invalidSecret: false, errorMessage: '' };

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
                enabled: false,
                load: 0,
                loadMultiplier: 1,
                online: true,
                serverID: "87abb152-634a-4565-812a-80d4e1391439",
                serverUrl: "https://vcs1.etfbl.net/bigbluebutton/api/",
            }, {
                enabled: false,
                load: 0,
                loadMultiplier: 1,
                online: true,
                serverID: "3cf4fcbf-950a-4f02-9068-a0f0120bc59e",
                serverUrl: "https://vcs2.etfbl.net/bigbluebutton/api/",
            }];
            // let servers = action.payload;
            let i = 0;
            servers = servers?.map(s => {
                return { ...s, expandable: false, action: "Actions", key: ++i }
            });
            let sortedServers = sortBy(servers, ['enabled', 'online', 'serverUrl']);
            let first = sortedServers.indexOf(sortedServers.find(s => s.enabled && s.online));
            let newSortedServers = sortedServers.slice(first).concat(sortedServers.slice(0, first));
            console.log("STATE - ", state);
            return { ...state, data: newSortedServers, redirectTo: null };
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
            return { ...state, update: action.payload, type: action.payload, message: '' };
        case FETCH_MEETINGS:
            return { ...state, redirectTo: `/admin-andrea/meetings/${action.payload.serverID}` }
        case SHOW_MESSAGE:
            return { ...state, message: action.payload };
        case INVALID_SECRET:
            return { ...state, invalidSecret: action.payload, errorMessage: 'You did not pass the checksum security check' };
        case UPDATE_REDIRECT_TO:
            return { ...state, redirectTo: action.payload };
        default:
            return INITIAL_STATE;
    }
};
