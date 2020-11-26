import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import Server from "./components/Server";
import "./index.css";
import store from "./store";

const rootElement = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		{/* <App /> */}
		{/* <Table /> */}
		<Server />
	</Provider>,
	rootElement
)
