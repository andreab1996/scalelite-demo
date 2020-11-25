import Icon from '@ant-design/icons/lib/components/Icon';
import { Alert } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServers, closeAlert } from '../actions';
import AntdTable from './AntdTable';
class ReduxExample extends Component {
    UNSAFE_componentWillMount() {
        this.props.getServers();
    }

    onGetData = () => {
        this.props.getServers();
    }

    onCloseAlert = () => {
        console.log("click")
        this.props.closeAlert();
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
                    // onClick={this.onCloseAlert}
                    />
                    : this.props.update === "ERROR" ?
                        <Alert
                            message="Error"
                            description="Something went wrong! Try again."
                            type="error"
                            showIcon
                            closable
                        // onClick={this.onCloseAlert}
                        /> : []
                }
                <div style={{ margin: "30px" }}>
                    <AntdTable children={this.props.data} />
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
    { getServers, closeAlert }
)(ReduxExample);
