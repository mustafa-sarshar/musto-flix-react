// Import Libs
import React from "react";

// Import Styles
import "./actorView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class ActorView extends React.Component {
  render() {
    <>
      <div>Actor View</div>
      <br />
      <p>{this.props.actor}</p>
    </>;
  }
}

export default ActorView;
