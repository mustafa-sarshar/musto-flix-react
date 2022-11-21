import React, { useState } from "react";
import { Button } from "../button/button";

// Import Styles
import "./loginView.scss"

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

// export class LoginView extends React.Component {
//     constructor(props) {
//         super(props);
//         if (DEBUG) console.log("constructor", this);

//         this.state = {
//             username: "",
//             password: "",
//         };

//         this.onUsernameChange = this.onUsernameChange.bind(this);
//         this.onPasswordChange = this.onPasswordChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     render() {
//         if (DEBUG) console.log("render", this);

//         return (
//             <form>
//                 <label>
//                     Username:
//                     <input
//                         type="text"
//                         value={this.state.username}
//                         onChange={this.onUsernameChange}
//                     />
//                 </label>
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         value={this.state.password}
//                         onChange={this.onPasswordChange}
//                     />
//                 </label>
//                 <button type="button" onClick={this.handleSubmit}>
//                     Submit
//                 </button>
//             </form>
//         );
//     }
//     onUsernameChange(evt) {
//         this.setState({
//             username: evt.target.value,
//         });
//     }
//     onPasswordChange(evt) {
//         this.setState({
//             password: evt.target.value,
//         });
//     }
//     handleSubmit(evt) {
//         evt.preventDefault();
//         const { username, password } = this.state;
//         if (DEBUG) console.log("username:", username, "password:", password);
//         /* Send a request to the server for authentication */
//         /* then call props.onLoggedIn(username) */
//         // props.onLoggedIn(username);
//     }
// }

function LoginView(props) {
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

export default LoginView;
