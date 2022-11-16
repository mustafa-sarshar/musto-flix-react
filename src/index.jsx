// Import Libs
import React from "react";
import ReactDom from "react-dom";

// Import Styles
import "./index.scss";

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <div className="my-flix">
                <div>Good Morning</div>
            </div>
        );
    }
}

// Find the root of the App
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render the app in the root DOM element
ReactDom.render(React.createElement(MyFlixApplication), container);
