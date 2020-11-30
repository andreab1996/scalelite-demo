import {
    ADD_SERVER,
    CLOSE_ALERT,
    DELETE_SERVER,
    FETCH_MEETINGS,
    FETCH_SERVERS,
    UPDATE_SERVER
} from '../actions/types';
import { StatusCode } from '../util/StatusCode';
import sortBy from "lodash/sortBy";

const INITIAL_STATE = { data: [], update: '', type: '', meetings: [], redirectTo: null };

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
                enabled: true,
                load: 0,
                loadMultiplier: 1,
                online: true,
                serverID: "3cf4fcbf-950a-4f02-9068-a0f0120bc59e",
                serverUrl: "https://vcs2.etfbl.net/bigbluebutton/api/",
            }];
            // let servers = action.payload;
            let i = 0;
            servers = servers.map(s => {
                return { ...s, expandable: false, action: "Actions", key: ++i }
            });
            let sortedServers = sortBy(servers, 'enabled', 'online', 'name').reverse();
            return { ...state, data: sortedServers };
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
        case FETCH_MEETINGS:
            let tmp = [
                {
                    attendeePW: "RJqiYFvCieSc",
                    attendees: {
                        attendee: [
                            {
                                clientType: "HTML5",
                                fullName: "Andrea Baco",
                                hasJoinedVoice: false,
                                hasVideo: false,
                                isListeningOnly: true,
                                isPresenter: true,
                                role: "MODERATOR",
                                userID: "gl-uwozabkojkre",
                            }, {
                                clientType: "HTML5",
                                fullName: "Andrea",
                                hasJoinedVoice: false,
                                hasVideo: false,
                                isListeningOnly: true,
                                isPresenter: false,
                                role: "VIEWER",
                                userID: "gl-guest-1cde8bebef91436c03b542f6",
                            }
                        ]
                    },
                    createDate: "Sun Nov 29 19:26:35 UTC 2020",
                    createTime: 1606677995506,
                    dialNumber: "613-555-1234",
                    duration: 0,
                    endTime: 0,
                    hasBeenForciblyEnded: false,
                    hasUserJoined: true,
                    internalMeetingID: "ad08f081c9572028917ead578226a394b05a185b-1606677995506",
                    isBreakout: false,
                    listenerCount: 2,
                    maxUsers: 0,
                    meetingID: "r6giqrqqv4x5htnxlj1lkwjpwzyflji4j8sqrizl",
                    meetingName: "Home Room",
                    moderatorCount: 1,
                    moderatorPW: "PvgpAxWpuZOt",
                    participantCount: 2,
                    recording: true,
                    running: true,
                    startTime: 1606677995689,
                    videoCount: 0,
                    voiceBridge: 73412,
                    voiceParticipantCount: 0,
                    metadata: {
                        "bbb-origin": "Greenlight",
                        "bbb-origin-server-name": "vcs1.etfbl.net",
                        "bbb-origin-version": "2.7.9",
                        "gl-listed": false,
                    }
                },
                {
                    attendeePW: "RJqiYFvCieSc",
                    attendees: {},
                    createDate: "Sun Nov 29 19:26:35 UTC 2020",
                    createTime: 1606677995506,
                    dialNumber: "613-555-1234",
                    duration: 0,
                    endTime: 0,
                    hasBeenForciblyEnded: false,
                    hasUserJoined: true,
                    internalMeetingID: "ad08f081c9572028917ead578226a394b05a185b-1606677995506",
                    isBreakout: false,
                    listenerCount: 2,
                    maxUsers: 0,
                    meetingID: "r6giqrqqv4x5htnxlj1lkwjpwzyflji4j8sqrizl",
                    meetingName: "Home Room",
                    moderatorCount: 1,
                    moderatorPW: "PvgpAxWpuZOt",
                    participantCount: 2,
                    recording: true,
                    running: true,
                    startTime: 1606677995689,
                    videoCount: 0,
                    voiceBridge: 73412,
                    voiceParticipantCount: 0
                }
            ]
            return { ...state, meetings: tmp, redirectTo: `/admin-andrea/meetings/${action.payload.serverID}` } //?serverID=${action.payload.serverID}
        default:
            return state;
    }
};
