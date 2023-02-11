// // Import Libs
import React from "react";

// Import Styles
import "./styles.scss";

// Import Bootstrap Components
import { Row, Col } from "react-bootstrap";

// Debugger
import { APP_MODE, APP_ADDRESS } from "../../config";
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class LoadingView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const user = localStorage.getItem("user");
    if (!user) {
      window.open(APP_MODE === "prod" ? APP_ADDRESS : "/", "_self");
    }
  }
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
