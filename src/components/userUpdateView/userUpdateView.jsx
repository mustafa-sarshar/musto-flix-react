// Import Libs
import React from "react";

// Import Styles
import "./userUpdateView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class UserUpdateView extends React.Component {
  render() {
    <>
      <div>User Update View</div>
      <br />
      <p>{this.props.user}</p>
    </>;
  }
}

export default UserUpdateView;
