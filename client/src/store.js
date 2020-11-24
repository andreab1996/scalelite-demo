import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/reducer";

const composedEnhancer = composeWithDevTools(
  // Add whatever middleware you actually want to use here
  applyMiddleware(ReduxThunk)
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);
export default store;
