import { Alert } from 'antd';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { closeAlert, getServers, addServer } from '../actions';
import AntdTable from './AntdTable';
import Button from '@material-ui/core/Button';
class ReduxExample extends Component {
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
                {this.props.update === "SUCCESS" ?
                    <Alert
                        message="Success"
                        description="Server has been successfully updated."
                        type="success"
                        showIcon
                        closable
                        closeAlert
                        onClick={this.onCloseAlert}
                    />
                    : this.props.update === "ERROR" ?
                        <Alert
                            message="Error"
                            description="Something went wrong! Try again."
                            type="error"
                            showIcon
                            closable
                            onClick={this.onCloseAlert}
                        /> : this.props.update === "SUCCESS_CREATE" ?
                            <Alert
                                message="Success"
                                description="Server has been successfully created and enabled."
                                type="success"
                                showIcon
                                closable
                                onClick={this.onCloseAlert}
                            /> : []
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

const mapStateToProps = ({ textInput }) => {
    const { data, update } = textInput;

    return { data, update };
}

export default connect(
    mapStateToProps,
    { getServers, closeAlert, addServer }
)(hot(ReduxExample));
