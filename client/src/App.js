import React from "react";
import {
	BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Login from "./components/Login";
import Meetings from "./components/Meetings";
import Server from "./components/Server";

export default function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/admin-andrea/meetings/:id' component={Meetings} />
					<Route exact path='/admin-andrea/servers' component={Server} />
					<Route exact path='/admin-andrea' component={Login} />
				</Switch>
			</div>
		</Router>
	);
}
