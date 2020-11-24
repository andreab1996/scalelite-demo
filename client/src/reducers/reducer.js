import { combineReducers } from "redux";
import TextInputReducer from './TextInputReducer';

const rootReducer = combineReducers({
	textInput: TextInputReducer,
});

export default rootReducer;
