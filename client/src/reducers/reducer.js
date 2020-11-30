import { combineReducers } from "redux";
import ServerReducer from './ServerReducer';
import LoginReducer from './LoginReducer';
import MeetingReducer from "./MeetingReducer";

const rootReducer = combineReducers({
	server: ServerReducer,
	login: LoginReducer,
	meeting: MeetingReducer
});

export default rootReducer;
