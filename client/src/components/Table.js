import React, { Component } from "react";
import { hot } from 'react-hot-loader/root';
import "./index.css";
class Table extends Component {

	renderTableData() {
		return this.props.children.map((server, index) => {
			const { serverID, serverUrl, online, loadMultiplier, enabled, load } = server //destructuring
			return (
				<tr key={serverID._text}>
					<td>{serverID._text}</td>
					<td>{serverUrl._text}</td>
					<td>{online._text}</td>
					<td>{loadMultiplier._text}</td>
					<td>{enabled._text === "true" ? "Enabled" : "Disabled"}</td>
					<td>{load._text}</td>
					<td><a onClick={() => console.log("ID = ", serverID._text)}>
						{enabled._text !== "true" ? "Enable" : "Disable"}
					</a></td>
					<td><a onClick={() => console.log("delete")}>
						Delete
					</a></td>
				</tr>
			)
		})
	}

	renderTableHeader() {
		let header = Object.keys(this.props.children[0]);
		return header.map((key, index) => {
			return <th key={index}>{key.toUpperCase()}</th>
		})
	}

	render() {
		return (
			<div>
				<div style={{ margin: "15px" }}>
					<h1 id='title'>SERVERS</h1>
					<table id='students'>
						<tbody>
							<tr>{this.renderTableHeader()}</tr>
							{this.renderTableData()}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default hot(Table);
