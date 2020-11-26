import { Alert } from 'antd';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { addServer, closeAlert, getServers } from '../actions';
import { StatusCode } from '../util/StatusCode';
import AntdTable from './AntdTable';
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

    render() {
        return (
            <div>
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
                <div style={{ margin: "30px" }}>
                    <AntdTable children={this.props.data} />
                </div>
                <div style={{ margin: "30px" }}>
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
                </div>
            </div >
        )
    }
}

const mapStateToProps = ({ server }) => {
    const { data, update } = server;

    return { data, update };
}

export default connect(
    mapStateToProps,
    { getServers, closeAlert, addServer }
)(hot(Server));
