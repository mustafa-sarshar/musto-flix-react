// Import Libs
import React from "react";

// Import Styles
import "./directorView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class DirectorView extends React.Component {
  render() {
    <>
      <div>Director View</div>
      <br />
      <p>{this.props.director}</p>
    </>;
  }
}

export default DirectorView;
