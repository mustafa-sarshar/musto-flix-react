// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";

// Import Styles
import "./registrationView.scss";

// Import Components
import { Button } from "../button/button";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (DEBUG)
            console.log(
                "username:",
                username,
                "password:",
                password,
                "email:",
                email,
                "birth:",
                birth,
            );
        /* Send a request to the server for authentication */
        /* then call props.onSignedIn(username) */
        props.onSignedIn(username);
    };
    return (
        <>
            <p className="login-title">Please register yourself, if you still don't have any accounts</p>
            <hr />
            <div className="login-form">
                <form>
                    <div className="login-form__groups">
                        <label>Username: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="clear-fix"></div>
                    <div className="login-form__groups">
                        <label>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="clear-fix"></div>
                    <div className="login-form__groups">
                        <label>Password: </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="clear-fix"></div>
                    <div className="login-form__groups">
                        <label>Birth date: </label>
                        <input
                            id="birth"
                            type="birth"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </div>
                    <div className="clear-fix"></div>
                    <div className="login-form__groups">
                        <Button
                            btnName="btnSubmit"
                            btnLabel="Sign in"
                            btnOnClick={handleSubmit}
                        />
                    </div>
                    <div className="clear-fix"></div>
                </form>
            </div>
        </>
    );
}

RegistrationView.propTypes = {
    onSignedIn: PropTypes.func.isRequired,
};

export default RegistrationView;
