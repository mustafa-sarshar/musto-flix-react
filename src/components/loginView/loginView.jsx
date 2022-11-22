// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";

// Import Styles
import "./loginView.scss";

// Import Components
import { Button } from "../button/button";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

function LoginView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = (evt) => {
        evt.preventDefault();
        if (DEBUG) console.log("username:", username, "password:", password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };
    const handleRequestSignIn = (evt) => {
        evt.preventDefault();
        if (DEBUG) console.log("username:", username, "password:", password);
        /* Send a request to the server for registration */
        props.onRequestSignIn(username);
    };
    return (
        <>
            <h1 className="login-title">Please Log In To Enjoy It 😊</h1>
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
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="clear-fix"></div>
                    <div className="login-form__groups">
                        <Button
                            btnName="btnSubmit"
                            btnLabel="Login"
                            btnOnClick={handleLogIn}
                        />
                    </div>
                    <div className="clear-fix"></div>
                    <div className="login-form__groups">
                        <Button
                            btnName="btnSignIn"
                            btnLabel="Register"
                            btnOnClick={handleRequestSignIn}
                        />
                    </div>
                    <div className="clear-fix"></div>
                </form>
            </div>
        </>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
