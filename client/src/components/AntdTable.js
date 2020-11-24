import { Table } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import './index.css';

let servers = [];
const columns = [
    // { title: 'Server ID', dataIndex: 'serverID', key: 'serverID', render: (data) => <span>{data._text}</span> },
    { title: 'Server URL', dataIndex: 'serverUrl', key: 'serverUrl', render: (data) => <span>{data._text}</span> },
    { title: 'Online', dataIndex: 'online', key: 'online', render: (data) => <span>{data._text}</span> },
    { title: 'Load Multiplier', dataIndex: 'loadMultiplier', key: 'loadMultiplier', render: (data) => <span>{data._text}</span> },
    { title: 'Enabled', dataIndex: 'enabled', key: 'enabled', render: (data) => <span>{data._text}</span> },
    { title: 'Load', dataIndex: 'load', key: 'load', render: (data) => <span>{data._text} </span> },
    {
        title: 'Enable/Disable',
        dataIndex: 'serverID',
        key: 'enabled',
        render: (data) =>
            <a onClick={() => console.log("enable/disable ID = ", data._text)}>
                {servers.find(s => s.serverID._text == data._text).enabled._text === "true" ? "Disable" : "Enable"}
            </a>,
    },
    {
        title: 'Action',
        dataIndex: 'serverID',
        key: 'x',
        render: (data) => <a onClick={() => console.log("delete ID = ", data._text)}>Delete</a>,
    },
];

class AntdTable extends Component {
    constructor(props) {
        super(props);
        servers = this.props.children;
    }
    render() {
        return (
            <Table id="students"
                columns={columns}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.serverUrl._text}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
                dataSource={this.props.children}
            />
        )
    }
}

export default (AntdTable);