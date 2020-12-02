import {
    FETCH_MEETINGS
} from '../actions/types';

const INITIAL_STATE = { meetings: [], redirectTo: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_MEETINGS:
            // let tmp = [
            //     {
            //         attendeePW: "RJqiYFvCieSc",
            //         attendees: {
            //             attendee: [
            //                 {
            //                     clientType: "HTML5",
            //                     fullName: "Andrea Baco",
            //                     hasJoinedVoice: false,
            //                     hasVideo: false,
            //                     isListeningOnly: true,
            //                     isPresenter: true,
            //                     role: "MODERATOR",
            //                     userID: "gl-uwozabkojkre",
            //                 }, {
            //                     clientType: "HTML5",
            //                     fullName: "Andrea",
            //                     hasJoinedVoice: false,
            //                     hasVideo: false,
            //                     isListeningOnly: true,
            //                     isPresenter: false,
            //                     role: "VIEWER",
            //                     userID: "gl-guest-1cde8bebef91436c03b542f6",
            //                 }
            //             ]
            //         },
            //         createDate: "Sun Nov 29 19:26:35 UTC 2020",
            //         createTime: 1606677995506,
            //         dialNumber: "613-555-1234",
            //         duration: 0,
            //         endTime: 0,
            //         hasBeenForciblyEnded: false,
            //         hasUserJoined: true,
            //         internalMeetingID: "ad08f081c9572028917ead578226a394b05a185b-1606677995506",
            //         isBreakout: false,
            //         listenerCount: 2,
            //         maxUsers: 0,
            //         meetingID: "r6giqrqqv4x5htnxlj1lkwjpwzyflji4j8sqrizl",
            //         meetingName: "Home Room",
            //         moderatorCount: 1,
            //         moderatorPW: "PvgpAxWpuZOt",
            //         participantCount: 2,
            //         recording: true,
            //         running: true,
            //         startTime: 1606677995689,
            //         videoCount: 0,
            //         voiceBridge: 73412,
            //         voiceParticipantCount: 0,
            //         metadata: {
            //             "bbb-origin": "Greenlight",
            //             "bbb-origin-server-name": "vcs1.etfbl.net",
            //             "bbb-origin-version": "2.7.9",
            //             "gl-listed": false,
            //         }
            //     },
            //     {
            //         attendeePW: "RJqiYFvCieSc",
            //         attendees: {},
            //         createDate: "Sun Nov 29 19:26:35 UTC 2020",
            //         createTime: 1606677995506,
            //         dialNumber: "613-555-1234",
            //         duration: 0,
            //         endTime: 0,
            //         hasBeenForciblyEnded: false,
            //         hasUserJoined: true,
            //         internalMeetingID: "ad08f081c9572028917ead578226a394b05a185b-1606677995506",
            //         isBreakout: false,
            //         listenerCount: 2,
            //         maxUsers: 0,
            //         meetingID: "r6giqrqqv4x5htnxlj1lkwjpwzyflji4j8sqrizl",
            //         meetingName: "Home Room",
            //         moderatorCount: 1,
            //         moderatorPW: "PvgpAxWpuZOt",
            //         participantCount: 2,
            //         recording: true,
            //         running: true,
            //         startTime: 1606677995689,
            //         videoCount: 0,
            //         voiceBridge: 73412,
            //         voiceParticipantCount: 0
            //     }
            // ]
            return { ...state, meetings: action.payload.meetings, redirectTo: `/admin-andrea/meetings/${action.payload.serverID}` }
        default:
            return state;
    }
};
