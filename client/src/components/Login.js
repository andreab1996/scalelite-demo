import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { passwordChanged, usernameChanged, login, checkCookies, noSecret } from '../actions';
import loginBackground from '../util/loginBackground.jpg';
import { Redirect } from 'react-router-dom'

class Login extends Component {
    UNSAFE_componentWillMount() {
        this.props.checkCookies();
        console.log("hasCookies = ", this.props.hasCookies, "redirectTo", this.props.redirectTo)
    }

    onUsernameChanged(e) {
        this.props.usernameChanged(e.target.value);
    }

    onPasswordChange(e) {
        this.props.passwordChanged(e.target.value);
    }

    onLogin(e) {
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
                    <div style={{ color: "red", fontSize: "18px" }}>
                        <span>{this.props.error}</span>
                    </div>
                    <div style={{ color: "red", fontSize: "18px" }}>
                        <span>{this.props.errorMessage}</span>
                    </div>
                    {/* <div style={{ color: "red", fontSize: "18px" }}>
                        <span>{this.props.errMessage}</span>
                    </div> */}
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

const style = {
    margin: 15,
};

const centeredDiv = {
    top: "50%",
    left: "50%",
    width: "400px",
    height: "350px",
    position: "fixed",
    background: "rgb(11, 83, 168)",
    opacity: "0.7",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",
    textAlign: "center",
}

const backGround = {
    height: "100vh",
    flex: 1,
    backgroundImage: `url(${loginBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
}

const loginText = {
    textAlign: "center",
    color: "white",
    marginTop: "80px"
}

const inputStyle = {
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    width: "300px",
    height: "40px",
    borderRadius: "10px",
    border: "2px solid rgb(52, 118, 240)",
}

const buttonStyle = {
    width: "200px",
    background: "rgb(52, 118, 240)",
    color: "white",
    fontSize: "15px",
    margin: "1em",
    padding: "0.25em 1em",
    border: "2px solid rgb(52, 118, 240)",
    borderRadius: "10px",
    marginTop: "20px",
    fontWeight: "600",
    height: "40px",
}

const mapStateToProps = ({ login, server, meeting }) => {
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
    const { errMessage } = meeting;
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
        errMessage,
        noSecret
    };
};

export default connect(mapStateToProps, {
    usernameChanged,
    passwordChanged,
    login,
    checkCookies
})(hot(Login));