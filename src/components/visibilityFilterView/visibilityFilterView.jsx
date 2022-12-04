// Import Libs
import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../../actions/actions";

// Import Styles
import "./visibilityFilterView.scss";

// Import Bootstrap Components
import { Form } from "react-bootstrap";

function VisibilityFilterView(props) {
  console.log("VisibilityFilterView:", this);
  return (
    <Form>
      <Form.Group>
        <Form.Text>Search movie:</Form.Text>
        <Form.Control
          onChange={(evt) => props.setFilter(evt.target.value)}
          value={props.visibilityFilter}
          placeholder="filter"
        />
      </Form.Group>
    </Form>
  );
}

export default connect(null, { setFilter })(VisibilityFilterView);
