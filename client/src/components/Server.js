import { Alert } from 'antd';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import {
    addServer,
    closeAlert,
    getServers,
    disableServer,
    enableServer,
    deleteServer,
    getMeetings
} from '../actions';
import { StatusCode } from '../util/StatusCode';
import AntdTable from './AntdTable';
import loginBackground from '../util/loginBackground.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
class Server extends Component {
    UNSAFE_componentWillMount() {
        this.props.getServers();
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

    render() {
        return (
            <div style={{
                background: `url(${loginBackground})`,
                // background: "gray",
                // opacity: "0.5",
                height: "100vh",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                overflow: "scroll",
            }}>
                {this.props.update ?
                    <Alert
                        message={
                            this.props.update === StatusCode.successCreate
                                || this.props.update === StatusCode.successUpdate
                                || this.props.update === StatusCode.successDelete
                                ? "Success" : "Error"}
                        description={
                            this.props.update === StatusCode.successCreate
                                ? "Server has been successfully created and enabled."
                                : this.props.update === StatusCode.successUpdate
                                    ? "Server has been successfully updated."
                                    : this.props.update === StatusCode.successDelete
                                        ? "Server has been successfully deleted."
                                        : this.props.update === StatusCode.error
                                            ? "Server has been successfully deleted."
                                            : "Something went wrong! Try again."}
                        type="success"
                        showIcon
                        closable
                        closeAlert
                        onClick={this.onCloseAlert}
                    />
                    : []
                }
                <h1 style={{ textAlign: "center", color: "white" }}>SERVERS</h1>
                <div style={{
                    display: "flex", flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                    {this.props.data.map(server => {
                        return (
                            <div
                                style={section}
                                onDoubleClick={() => this.onGetMeetings(server)}>
                                { server.enabled === true
                                    ? <div style={enabled}></div>
                                    : <div style={disabled}></div>
                                }
                                <div style={{ marginTop: "10px" }}>
                                    <span style={text}>Server URL: </span>
                                    {server.serverUrl}
                                </div>
                                <div style={{ marginTop: "5px" }}>
                                    <span style={text}>Status: </span>
                                    {server.online === true ? "Online" : "Offline"}
                                </div>
                                <div style={{ marginTop: "5px" }}>
                                    <span style={text}>Enable: </span>
                                    {/* <span style={dot}></span> */}
                                    {server.enabled === true ? "Yes" : "No"}
                                </div>
                                <div style={{
                                    marginTop: "10px",
                                    float: "right"
                                }}>
                                    {server.enabled === true && server.online === true ?
                                        <button
                                            onClick={(e) => { this.onGetMeetings(server) }}
                                            style={{
                                                background: "#4682B4",
                                                color: "white",
                                                fontSize: "1em",
                                                margin: "5px",
                                                padding: "0.25em 1em",
                                                border: "2px solid #4682B4",
                                                borderRadius: "3px",
                                            }}
                                        >
                                            Show meetings
                                    </button>
                                        : []
                                    }
                                    <button
                                        onClick={(e) => { this.onUpdateServer(server) }}
                                        style={{
                                            background: "#4682B4",
                                            color: "white",
                                            fontSize: "1em",
                                            margin: "5px",
                                            padding: "0.25em 1em",
                                            border: "2px solid #4682B4",
                                            borderRadius: "3px",
                                        }}
                                    >
                                        {server.enabled === true ? "Disable" : "Enable"}
                                    </button>
                                    {/* <button
                                        onClick={(e) => { this.onDeleteServer(server) }}
                                        style={{
                                            background: "#DC143C",
                                            color: "white",
                                            fontSize: "1em",
                                            margin: "5px",
                                            padding: "0.25em 1em",
                                            border: "2px solid #DC143C",
                                            borderRadius: "3px",
                                        }}
                                    >
                                        Delete
                                    </button> */}
                                </div>
                            </div>
                        )
                    })}
                    {/* <div style={section}> */}
                    <div style={{
                        display: "flex", flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "ceter",
                        lineHeight: "200px",
                        margin: "20px",
                        width: "300px",
                        height: "200px",
                        background: "white",
                        opacity: "0.85",
                        borderRadius: "20px",
                        padding: "10px",
                        color: "black",
                    }}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            size="4x"
                            color="grey"
                            onClick={this.onAddServer} />
                    </div>
                    {/* </div> */}
                    {/* <div style={{ margin: "30px" }}>
                    <AntdTable children={this.props.data} />
                </div> */}
                    {/* <div style={{ margin: "30px" }}>
                    <button
                        onClick={this.onAddServer}
                        style={{
                            background: "rgb(52, 118, 240)",
                            color: "white",
                            fontSize: "1em",
                            margin: "1em",
                            padding: "0.25em 1em",
                            border: "2px solid rgb(75, 134, 245)",
                            borderRadius: "3px",
                        }}
                    >
                        Add new Server
                    </button>
                </div> */}
                </div >
            </div>
        )
    }
}

const section = {
    margin: "20px",
    width: "300px",
    height: "200px",
    // background: "rgb(11, 83, 168)",
    background: "white",
    opacity: "0.8",
    borderRadius: "20px",
    padding: "10px",
    color: "black",
}

const text = {
    margin: "15px 5px 15px 15px",
    fontWeight: "700",
    fontSize: "14px",
}

const enabled = {
    background: "green",
    height: "5px",
    width: "100%",
    borderRadius: "20px",
}

const disabled = {
    background: "red",
    height: "5px",
    width: "100%",
    borderRadius: "25px",
}

const dot = {
    height: "15px",
    width: "15px",
    backgroundColor: "red",
    borderRadius: "50%",
    display: "inline-block",
}

const mapStateToProps = ({ server }) => {
    const { data, update } = server;

    return { data, update };
}

export default connect(
    mapStateToProps,
    { getServers, closeAlert, addServer, disableServer, enableServer, deleteServer, getMeetings }
)(hot(Server));
