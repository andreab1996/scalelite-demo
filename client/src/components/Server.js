import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactJsAlert from "reactjs-alert";
import {
    addServer,
    closeAlert,
    deleteServer,
    disableServer,
    enableServer,
    getMeetings,
    getServers,
    logout,
    showInfoMessage,
    updateRedirectTo
} from '../actions';
import { StatusCode } from '../util/StatusCode';
import CustomAppBar from './common/CustomAppBar';
class Server extends Component {
    constructor(props) {
        super(props);

        this.onGetData();
    }

    componentDidMount() {
        setInterval(this.onGetData, 30000);
    }

    onGetData = () => {
        this.props.getServers();
    }

    onCloseAlert = () => {
        this.props.closeAlert();
    }

    onAddServer = () => {
        this.props.addServer();
        this.props.getServers();
    }

    onUpdateServer = (server) => {
        console.log(server);
        if (server.enabled)
            this.props.disableServer(server.serverID);
        if (!server.enabled)
            this.props.enableServer(server.serverID);

        this.props.getServers();
    }

    onDeleteServer = (server) => {
        this.props.deleteServer(server.serverID);
        this.props.getServers();
    }

    onGetMeetings = (server) => {
        this.props.getMeetings(server.serverID);
    }

    onShowInfoMessage = () => {
        this.props.showInfoMessage("The server must be online and allow meetings to be held.");
    }

    onLogOut = () => {
        this.props.logout();
        this.props.updateRedirectTo("/admin-andrea/");
    }

    render() {
        return (
            <div style={{
                height: "100vh",
                background: "rgb(239, 236, 236)",
                overflow: "scroll",
                marginTop: "0px"
            }}>
                <CustomAppBar
                    title="Servers"
                    logout={this.onLogOut}
                    refresh={this.onGetData}
                />
                {this.props.update ?
                    <ReactJsAlert
                        type={this.props.update === StatusCode.successCreate
                            || this.props.update === StatusCode.successUpdate
                            || this.props.update === StatusCode.successDelete
                            ? "success"
                            : this.props.update === StatusCode.error
                                ? "error" : "warning"}
                        title={this.props.update === StatusCode.successCreate
                            || this.props.update === StatusCode.successUpdate
                            || this.props.update === StatusCode.successDelete
                            ? "Success"
                            : this.props.update === StatusCode.error
                                ? "Error" : "Warning"}
                        status={true}
                        color="rgb(230, 0, 0)"
                        quote={
                            this.props.update === StatusCode.successCreate
                                ? "Server has been successfully created and enabled."
                                : this.props.update === StatusCode.successUpdate
                                    ? "Server has been successfully updated."
                                    : this.props.update === StatusCode.successDelete
                                        ? "Server has been successfully deleted."
                                        : this.props.update === StatusCode.error
                                            ? "Server has been successfully deleted."
                                            : "Something went wrong! Try again."}
                        Close={() => this.onCloseAlert()}
                    /> : []
                }
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                    {this.props.data.map(server => {
                        return (
                            <div
                                class="serverSection"
                                onDoubleClick={() => {
                                    if (server.enabled && server.online)
                                        this.onGetMeetings(server);
                                    else
                                        this.onShowInfoMessage();
                                }}>
                                {this.props.message !== ''
                                    ? <ReactJsAlert
                                        type="info"
                                        title="Information"
                                        status={true}
                                        color="rgb(230, 0, 0)"
                                        quote={this.props.message}
                                        Close={() => this.onCloseAlert()}
                                    />
                                    : ''}
                                {server.enabled === true
                                    ? <div class="enabled"></div>
                                    : <div class="disabled"></div>
                                }
                                <div style={{ marginTop: "15px" }}>
                                    <span class="serverText">Server: </span>
                                    <span style={{ margin: "15px 5px 15px 5px" }}>{server.serverUrl.split("/")[2]}</span>
                                </div>
                                <div style={{ marginTop: "5px" }}>
                                    <span class="serverText">Status: </span>
                                    {server.online === true ? "Online" : "Offline"}
                                </div>
                                <div style={{ marginTop: "5px" }}>
                                    <span class="serverText">Enabled: </span>
                                    {server.enabled === true ? "Yes" : "No"}
                                </div>
                                <div style={{ marginTop: "5px" }}>
                                    <span class="serverText">Load Multiplier: </span>
                                    {server.loadMultiplier}
                                </div>
                                <div style={{ marginTop: "5px" }}>
                                    <span class="serverText">Number of conferences: </span>
                                    {server.load}
                                </div>
                                <div style={{
                                    marginTop: "10px",
                                    float: "right"
                                }}>
                                    {server.enabled && server.online
                                        ? <button
                                            class="meetingButton"
                                            onClick={(e) => { this.onGetMeetings(server) }}
                                        >
                                            Meetings
                                        </button>
                                        : ''
                                    }
                                    <button
                                        class="updateButton"
                                        onClick={(e) => { this.onUpdateServer(server) }}
                                    >
                                        {server.enabled === true ? "Disable" : "Enable"}
                                    </button>
                                    {!server.enabled || !server.online ?
                                        <button
                                            class="deleteButton"
                                            onClick={(e) => { this.onDeleteServer(server) }}
                                        >
                                            Delete
                                    </button>
                                        : ""}
                                </div>
                            </div>
                        )
                    })}
                    <div class="plusServer">
                        <FontAwesomeIcon
                            icon={faPlus}
                            size="4x"
                            color="grey"
                            onClick={this.onAddServer} />
                    </div>
                    {
                        this.props.redirectTo !== null
                            ? <Redirect to={this.props.redirectTo} />
                            : ""
                    }
                    {
                        this.props.invalidSecret
                            ? <Redirect to="/admin-andrea/" />
                            : ""
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ server }) => {
    const { data, update, redirectTo, message, invalidSecret } = server;

    return { data, update, redirectTo, message, invalidSecret };
}

export default connect(
    mapStateToProps,
    {
        getServers,
        closeAlert,
        addServer,
        disableServer,
        enableServer,
        deleteServer,
        getMeetings,
        showInfoMessage,
        logout,
        updateRedirectTo,
    }
)(hot(Server));
