import { combineReducers } from "redux";
import ServerReducer from './ServerReducer';
import LoginReducer from './LoginReducer';

const rootReducer = combineReducers({
	server: ServerReducer,
	login: LoginReducer,
});

export default rootReducer;
