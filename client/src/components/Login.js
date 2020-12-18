import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkCookies, login, noSecret, secretKeyChanged } from '../actions';
import './index.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.props.checkCookies();
    }

    onSecretKeyChanged(e) {
        this.props.secretKeyChanged(e.target.value);
    }

    onLogin() {
        this.props.login(this.props.secretKey);
    }

    onNoSecret() {
        this.props.noSecret();
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            console.log(this.props.secretKey)
            this.props.login(this.props.secretKey);
        }

    }

    render() {
        return (
            <div class="backGround">
                <div class="centeredDiv">
                    <h1 class="loginText">Login</h1>
                    <div style={{ marginTop: "20px" }}>
                        <input
                            type="password"
                            placeholder="Please enter secret key"
                            class="inputStyle"
                            onChange={(e) => { this.onSecretKeyChanged(e) }}
                            onKeyDown={(e) => this.handleKeyDown(e)}
                        />
                    </div>
                    <div style={{ color: "rgb(230, 0, 0)", fontSize: "18px" }}>
                        <span>{this.props.error}</span>
                    </div>
                    <div style={{ color: "rgb(230, 0, 0)", fontSize: "18px" }}>
                        <span>{this.props.errorMessage}</span>
                    </div>
                    <button
                        onClick={() => this.onLogin()}
                        class="buttonStyle"
                    >
                        LOGIN
                    </button>
                    {
                        this.props.redirectTo !== null || this.props.hasCookies === true
                            ? <Redirect to={this.props.redirectTo} />
                            : ""
                    }
                    {this.props.errorMessage ? this.onNoSecret() : ""}
                </div >
            </div >
        );
    }
}

const mapStateToProps = ({ login, server }) => {
    const {
        secretKey,
        redirectTo,
        hasCookies,
        error
    } = login;

    const { errorMessage } = server;

    return {
        secretKey,
        redirectTo,
        hasCookies,
        error,
        errorMessage,
    };
};

export default connect(mapStateToProps, {
    secretKeyChanged,
    login,
    checkCookies,
    noSecret
})(hot(Login));