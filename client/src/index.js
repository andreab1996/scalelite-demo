import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxExample from "./components/ReduxExample";
import "./index.css";
import store from "./store";

const rootElement = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		{/* <App /> */}
		{/* <Table /> */}
		<ReduxExample />
	</Provider>,
	rootElement
)
