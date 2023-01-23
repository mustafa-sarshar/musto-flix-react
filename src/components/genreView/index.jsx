// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

// Import Styles
import "./styles.scss";

// Import Bootstrap Components
import { Row, Col, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const GenreView = (props) => {
  if (DEBUG) console.log("render", this);

  const [genre, setGenre] = useState();

  const { movies, onBackClick } = props;
  const { id: genre_id } = useParams();

  if (!genre) {
    movies.find((movie) =>
      movie.genres.find((genre) => {
        if (genre._id === genre_id) {
          setGenre(genre);
        }
        return genre._id === genre_id;
      })
    );
  }

  return (
    <Row>
      <Col>
        <div className="genre-view">
          <Card>
            <Card.Header>
              <div className="genre-title">
                <h2>{genre?.name && genre.name}</h2>
              </div>
            </Card.Header>
            <Card.Body>
              <p className="genre-des">{genre?.des && genre.des}</p>
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

GenreView.propTypes = {
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default GenreView;
