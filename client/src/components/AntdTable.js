import { Table } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { deleteServer, disableServer, enableServer, getServers } from '../actions';
import CustomizedMenus from './CustomizedMenus';
import './index.css';

let columns = [];
let servers = [];
class AntdTable extends Component {
    constructor(props) {
        super(props);
        servers = this.props.children;
        columns = [
            { title: 'Server URL', dataIndex: 'serverUrl', key: 'serverUrl' },
            { title: 'Online', dataIndex: 'online', key: 'online', render: (data) => <span>{data ? "Online" : "Offline"}</span> },
            { title: 'Enabled', dataIndex: 'enabled', key: 'enabled', render: (data) => <span>{data ? "Enable" : "Disable"}</span> },
            {
                title: 'Action',
                dataIndex: 'serverID',
                key: 'x',
                render: (serverID) => (
                    <CustomizedMenus
                        serverID={serverID}
                        updateServer={this.onUpdateServer}
                        deleteServer={this.onDeleteServer}
                    />
                )
            },
        ];
    }

    onUpdateServer = (serverID) => {
        let server = this.props.children.find(s => s.serverID == serverID);
        if (server.enabled)
            this.props.disableServer(server.serverID);
        if (!server.enabled)
            this.props.enableServer(server.serverID);

        this.props.getServers();
    }

    onDeleteServer = (serverID) => {
        this.props.deleteServer(serverID);
        this.props.getServers();
    }

    render() {
        return (
            <div>
                <h1 id='title'>SERVERS</h1>
                <Table
                    id="servers"
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record) =>
                            <p style={{ margin: 0 }}>
                                Load Multiplier: {record.loadMultiplier}, Load: {record.load}
                            </p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={this.props.children}
                />
            </div>

        )
    }
}

const mapStateToProps = ({ server }) => {
    const { data } = server;

    return { data };
}

export default connect(
    mapStateToProps,
    { getServers, enableServer, disableServer, deleteServer }
)(hot(AntdTable));