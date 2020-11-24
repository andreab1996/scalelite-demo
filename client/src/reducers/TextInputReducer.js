import {
    FIRST_NAME_CHANGED,
    LAST_NAME_CHANGED,
    FULL_NAME_CHANGED,
    RECEIVE_DATA,
    ENABLE_SERVER,
    DISABLE_SERVER,
} from '../actions/types';

let convert = require('xml-js');

const INITIAL_STATE = { firstName: '', lastName: '', data: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FIRST_NAME_CHANGED:
            return { ...state, firstName: action.payload };
        case LAST_NAME_CHANGED:
            console.log(action.payload)
            return { ...state, lastName: action.payload };
        case FULL_NAME_CHANGED:
            let text = action.payload || '';
            let [firstName, lastName] = text.split(' ');
            return { ...state, firstName: firstName ? firstName : '', lastName: lastName ? lastName : '' };
        case RECEIVE_DATA:
            let xml = '<response>' +
                '<returncode>SUCCESS</returncode>' +
                '<version>2.0</version>' +
                '<servers>' +
                ' <server>' +
                '<serverID>211a1b81-cf0f-437f-b2fc-346d407796c6</serverID>' +
                '<serverUrl>https://vcs4.etfbl.net/bigbluebutton/api/</serverUrl>' +
                ' <online>true</online>' +
                ' <loadMultiplier>1.0</loadMultiplier>' +
                '<enabled>true</enabled>' +
                '<load>0.0</load>' +
                ' </server>' +
                '<server>' +
                '<serverID>02dea11c-ed7d-4377-b978-0ee1ad3d2382</serverID>' +
                '<serverUrl>https://vcs2.etfbl.net/bigbluebutton/api/</serverUrl>' +
                '<online>false</online>' +
                '<loadMultiplier>1.0</loadMultiplier>' +
                '<enabled>false</enabled>' +
                '<load>0.0</load>' +
                '</server>' +
                ' </servers>' +
                '</response>';
            let result = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 4 }));
            let servers = result.response.servers.server;
            state.data = servers.map(s => {
                return { ...s, enable: 'Enable/Disable', action: "Delete" }
            })
            console.log('redux', state.data);
            return { ...state };
        case ENABLE_SERVER:
            return state;
        case DISABLE_SERVER:
            return state;
        default:
            return state;
    }
};