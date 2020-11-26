import { combineReducers } from "redux";
import ServerReducer from './ServerReducer';

const rootReducer = combineReducers({
	server: ServerReducer,
});

export default rootReducer;
