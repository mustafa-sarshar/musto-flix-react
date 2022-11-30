// Import Libs
import React from "react";

// Import Styles
import "./genreView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class GenreView extends React.Component {
  render() {
    <>
      <div>Genre View</div>
      <br />
      <p>{this.props.genre}</p>
    </>;
  }
}

export default GenreView;
