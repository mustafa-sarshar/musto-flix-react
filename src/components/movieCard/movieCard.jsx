// Import Libs
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Import Styles
import "./movieCard.scss";

// Import Bootstrap Components
import { Card, Button } from "react-bootstrap";

// EnvVars
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const MovieCard = (props) => {
  if (DEBUG) console.log("render", this);

  const {
    movie,
    showAddBtn,
    showRemoveBtn,
    showOpenBtn,
    onAddClick,
    onRemoveClick,
  } = props;
  return (
    <Card className="movie-card h-100 w-100">
      <Card.Img variant="top" src={movie.image_url} />
      <Card.Body>
        <Card.Text>{movie.title}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-right">
        {showAddBtn && (
          <Button variant="link" className="text-success" onClick={onAddClick}>
            Add
          </Button>
        )}
        {showRemoveBtn && (
          <Button
            variant="link"
            className="text-danger"
            onClick={onRemoveClick}
          >
            Remove
          </Button>
        )}
        {showOpenBtn && (
          <Link
            to={{
              pathname: `/movies/${movie._id}`,
            }}
          >
            <Button variant="link" className="text-primary">
              Open
            </Button>
          </Link>
        )}
      </Card.Footer>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
