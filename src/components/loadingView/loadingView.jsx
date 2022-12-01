// // Import Libs
import React from "react";

// Import Styles
import "./loadingView.scss";

// Import Bootstrap Components
import { Row, Col } from "react-bootstrap";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class LoadingView extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <div className="loading-view">
            <p className="loading-view__message">Data is loading ...</p>
          </div>
        </Col>
      </Row>
    );
  }
}

export default LoadingView;
