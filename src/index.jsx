// Import Libs
import React from "react";
import ReactDom from "react-dom";

// Import Styles
import "./index.scss";

// Import Bootstrap Components
import { Container } from "react-bootstrap";

// Import Custom Components
import MainView from "./components/mainView/mainView";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        if (DEBUG) console.log("render", this);

        return (
            <Container>
                <MainView />
            </Container>
        );
    }
}

// Find the root of the App
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render the app in the root DOM element
ReactDom.render(React.createElement(MyFlixApplication), container);
