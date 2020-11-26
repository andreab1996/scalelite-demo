import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import Login from "./components/Login";
import Server from "./components/Server";
import "./index.css";
import store from "./store";
import 'font-awesome/css/font-awesome.min.css';

const rootElement = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		<App />
		{/* <Table /> */}
		{/* <Server /> */}
		{/* <Login /> */}
	</Provider>,
	rootElement
)
