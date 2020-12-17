import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkCookies, login, noSecret, usernameChanged } from '../actions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.props.checkCookies();
    }

    onUsernameChanged(e) {
        this.props.usernameChanged(e.target.value);
    }

    onLogin() {
        this.props.login(this.props.username);
    }

    onNoSecret() {
        this.props.noSecret();
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            console.log(this.props.username)
            this.props.login(this.props.username);
        }

    }

    render() {
        return (
            <div style={backGround}>
                <div style={centeredDiv}>
                    <h1 style={loginText}>Login</h1>
                    <div style={{ marginTop: "20px" }}>
                        <input
                            type="password"
                            placeholder="Please enter secret key"
                            style={inputStyle}
                            onChange={(e) => { this.onUsernameChanged(e) }}
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
                        style={buttonStyle}
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

const centeredDiv = {
    top: "50%",
    left: "50%",
    width: "400px",
    height: "350px",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",
    textAlign: "center",
    background: "rgb(239, 236, 236)"
}

const backGround = {
    height: "100vh",
    flex: 1,
}

const loginText = {
    textAlign: "center",
    color: "black",
    marginTop: "80px",
}

const inputStyle = {
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    width: "300px",
    height: "40px",
    borderRadius: "10px",
    border: "2px solid white",
    outline: "none"
}

const buttonStyle = {
    width: "200px",
    background: "rgb(230, 0, 0)",
    color: "white",
    fontSize: "15px",
    margin: "1em",
    padding: "0.25em 1em",
    border: "2px solid rgb(230, 0, 0)",
    borderRadius: "10px",
    marginTop: "20px",
    fontWeight: "600",
    height: "40px",
}

const mapStateToProps = ({ login, server }) => {
    const {
        name,
        username,
        password,
        confirmPassword,
        samePassword,
        registration,
        redirectTo,
        hasCookies,
        error
    } = login;

    const { errorMessage } = server;

    return {
        name,
        username,
        password,
        confirmPassword,
        samePassword,
        registration,
        redirectTo,
        hasCookies,
        error,
        errorMessage,
    };
};

export default connect(mapStateToProps, {
    usernameChanged,
    login,
    checkCookies,
    noSecret
})(hot(Login));