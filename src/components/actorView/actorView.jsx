// Import Libs
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dateFormat from "../../utils/dateFormat";

// Import Styles
import "./actorView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const ActorView = (props) => {
  if (DEBUG) console.log("render", this);

  const [actor, setActor] = useState({});

  const { onBackClick } = props;
  const { id: actor_id } = useParams();
  const token = localStorage.getItem("token");

  const fetchData = (actor_id, token) => {
    axios
      .get(`https://musto-movie-api.onrender.com/actors/${actor_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setActor(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (actor_id && token) {
    fetchData(actor_id, token);
  }

  return (
    <Row>
      <Col>
        <div className="actor-view">
          <Card>
            <Card.Header>
              <div className="actor-title">
                <h2>{actor?.name && actor.name}</h2>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="actor-poster">
                <img src="https://via.placeholder.com/250" />
              </div>
              <Table striped bordered hover size="sm" className="actor-table">
                <tbody>
                  <tr>
                    <th scope="row">Birth date</th>
                    <td>
                      {actor?.birth &&
                        dateFormat(actor.birth, "toLocaleDateString")}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Death date</th>
                    <td>
                      {actor?.death &&
                        dateFormat(actor.death, "toLocaleDateString")}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <p className="actor-bio">{actor?.bio && actor.bio}</p>
            </Card.Body>
            <Card.Footer className="text-left">
              <MyButton
                btnStyle="text-green border-none cursor-pointer add-padding--5px background-transparent"
                btnLabel="Back"
                btnOnClick={() => {
                  onBackClick();
                }}
              />
            </Card.Footer>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default ActorView;
