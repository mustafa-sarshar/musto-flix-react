// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import dateFormat from "../../utils/dateFormat";

// Import Styles
import "./directorView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// EnvVars
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const DirectorView = (props) => {
  if (DEBUG) console.log("render", this);

  const [director, setDirector] = useState();

  const { movies, onBackClick } = props;
  const { id: director_id } = useParams();

  if (!director) {
    movies.find((movie) =>
      movie.directors.find((director) => {
        if (director._id === director_id) {
          setDirector(director);
        }
        return director._id === director_id;
      })
    );
  }

  return (
    <Row>
      <Col>
        <div className="director-view">
          <Card>
            <Card.Header>
              <div className="director-title">
                <h2>{director?.name && director.name}</h2>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="director-poster">
                <img src="https://via.placeholder.com/250" />
              </div>
              <Table striped bordered hover size="sm" className="movie-table">
                <tbody>
                  <tr>
                    <th scope="row">Birth date</th>
                    <td>
                      {director?.birth &&
                        dateFormat(director.birth, "toLocaleDateString")}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Death date</th>
                    <td>
                      {director?.death &&
                        dateFormat(director.death, "toLocaleDateString")}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <p className="director-bio">{director?.bio && director.bio}</p>
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

DirectorView.propTypes = {
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default DirectorView;
