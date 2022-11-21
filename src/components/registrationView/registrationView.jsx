import React, { useState } from "react";
import { Button } from "../button/button";

// Import Styles
import "./registrationView.scss";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (DEBUG) console.log("username:", username, "password:", password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };
    return (
        <>
            <h1 className="login-title">Please Login To Enjoy It 😊</h1>
            <hr />
            <div className="login-form">
                <form>
                    <div className="login-form__username-group">
                        <label>Username: </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="clear-fix"></div>
                    <div className="login-form__password-group">
                        <label>Password: </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="clear-fix"></div>
                    <div className="login-form__button-group">
                        <Button
                            btnName="btnSubmit"
                            btnLabel="Log in"
                            btnOnClick={handleSubmit}
                        />
                    </div>
                    <div className="clear-fix"></div>
                </form>
            </div>
        </>
    );
}

export default RegistrationView;
