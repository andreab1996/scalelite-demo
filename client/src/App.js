import React from "react";
import {
	BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Login from "./components/Login";
import Server from "./components/Server";

export default function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/servers' component={Server} />
					<Route exact path='/' component={Login} />
				</Switch>
			</div>
		</Router>
	);
}
