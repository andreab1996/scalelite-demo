import { Alert } from 'antd';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { closeAlert, getServers, addServer } from '../actions';
import AntdTable from './AntdTable';
import Button from '@material-ui/core/Button';
import { StatusCode } from '../util/StatusCode';

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
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={this.onAddServer}
                    // color="secondary"
                    >
                        Add new Server
                    </Button>
                </div>
            </div>
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
