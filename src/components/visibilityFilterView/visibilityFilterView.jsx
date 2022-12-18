// Import Libs
import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../../actions/actions";

// Import Styles
import "./visibilityFilterView.scss";

// Import Bootstrap Components
import { Form } from "react-bootstrap";

// EnvVars
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

function VisibilityFilterView(props) {
  if (DEBUG) console.log("VisibilityFilterView:", this);
  return (
    <Form>
      <Form.Group>
        <Form.Text>
          <span className={"glyphicon glyphicon-search"}></span>Search movie:
        </Form.Text>
        <Form.Control
          onChange={(evt) => props.setFilter(evt.target.value)}
          value={props.visibilityFilter}
          placeholder="movie title"
        />
      </Form.Group>
    </Form>
  );
}

export default connect(null, { setFilter })(VisibilityFilterView);
