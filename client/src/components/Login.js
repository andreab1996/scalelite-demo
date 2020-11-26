import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { passwordChanged, usernameChanged, login } from '../actions';
import loginBackground from '../util/loginBackground.jpg';
import { Redirect } from 'react-router-dom'

class Login extends Component {
    onUsernameChanged(e) {
        console.log(e.target.value)
        this.props.usernameChanged(e.target.value);
    }

    onPasswordChange(e) {
        console.log(e.target.value)
        this.props.passwordChanged(e.target.value);
    }

    onLogin(e) {
        this.props.login();
    }

    render() {
        return (
            <div style={backGround}>
                <div style={centeredDiv}>
                    <h1 style={loginText}>Login</h1>
                    <div style={{ flexDirection: "row", marginTop: "20px" }}>
                        {/* <FontAwesomeIcon icon={faUser} /> */}
                        {/* <i className="fa fa-user"></i> */}
                        <input
                            type="text"
                            placeholder="Username"
                            style={inputStyle}
                            onChange={(e) => { this.onUsernameChanged(e) }}
                        />
                    </div>
                    <div style={{ opacity: "0.9", flexDirection: "row", marginTop: "20px" }}>
                        <input
                            onChange={(e) => { this.onPasswordChange(e) }}
                            type="password"
                            placeholder="Password"
                            style={inputStyle}
                        />
                    </div>
                    <button
                        onClick={() => this.onLogin()}
                        style={buttonStyle}
                    >
                        LOGIN
                    </button>
                    {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : ""}
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
    width: "500px",
    height: "500px",
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
    marginTop: "100px"
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
    marginTop: "50px",
    fontWeight: "600",
    height: "40px",
}

const mapStateToProps = ({ login }) => {
    const {
        name,
        username,
        password,
        confirmPassword,
        samePassword,
        registration,
        redirectTo
    } = login;

    return {
        name,
        username,
        password,
        confirmPassword,
        samePassword,
        registration,
        redirectTo
    };
};

export default connect(mapStateToProps, {
    usernameChanged,
    passwordChanged,
    login,
})(hot(Login));