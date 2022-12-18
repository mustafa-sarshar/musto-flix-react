// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import dateFormat from "../../utils/dateFormat";

// Import Styles
import "./actorView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// EnvVars
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const ActorView = (props) => {
  if (DEBUG) console.log("render", this);

  const [actor, setActor] = useState();

  const { movies, onBackClick } = props;
  const { id: actor_id } = useParams();

  if (!actor) {
    movies.find((movie) =>
      movie.stars.find((actor) => {
        if (actor._id === actor_id) {
          setActor(actor);
        }
        return actor._id === actor_id;
      })
    );
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

ActorView.propTypes = {
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default ActorView;
