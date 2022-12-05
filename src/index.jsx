// Import Libs
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";

// Import Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import moviesAppReducer from "./reducers/reducers";

// Import Styles
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

// Import Bootstrap Components
import { Container } from "react-bootstrap";

// Import Custom Components
import MainView from "./components/mainView/mainView";

// Initialize the Redux
const store = createStore(moviesAppReducer, {}, devToolsEnhancer());

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    if (DEBUG) console.log("render", this);

    return (
      <Provider store={store}>
        <Router>
          <Container>
            <ToastContainer />
            <MainView />
          </Container>
        </Router>
      </Provider>
    );
  }
}

// Find the root of the App
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render the app in the root DOM element
ReactDom.render(React.createElement(MyFlixApplication), container);
