import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firstNameChanged, lastNameChanged, fullNameChanged, getData } from '../actions';
import AntdTable from './AntdTable';
import Table from './Table';
class ReduxExample extends Component {
    onFirstNameChanged = (event) => {
        this.props.firstNameChanged(event.target.value);
    }

    onLastNameChanged = (event) => {
        this.props.lastNameChanged(event.target.value);
    }

    onFullNameChanged = (event) => {
        this.props.fullNameChanged(event.target.value);
    }

    onFullNameChanged = (event) => {
        this.props.fullNameChanged(event.target.value);
    }

    onGetData = () => {
        this.props.getData();
    }

    render() {
        return (
            <div>
                Redux Example
                <div>
                    <input
                        onChange={this.onFirstNameChanged}
                        value={this.props.firstName}
                    />
                </div>
                <div>
                    <input
                        onChange={this.onLastNameChanged}
                        value={this.props.lastName}
                    />
                </div>
                <div>
                    <input
                        onChange={this.onFullNameChanged}
                        value={`${this.props.firstName} ${this.props.lastName}`}
                    />
                </div>
                <button onClick={this.onGetData}>Fetch Data!</button>
                <div style={{ marginTop: "10px" }}>
                    {this.props.data.length > 0 ? <Table children={this.props.data} /> : "No Data"}
                </div>
                <div style={{ margin: "10px" }}>
                    {this.props.data.length > 0 ? <AntdTable children={this.props.data} /> : "No Data"}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ textInput }) => {
    const { firstName, lastName, data } = textInput;
    console.log("test", data)
    return { firstName, lastName, data };
}

export default connect(
    mapStateToProps,
    { firstNameChanged, lastNameChanged, fullNameChanged, getData }
)(ReduxExample);
