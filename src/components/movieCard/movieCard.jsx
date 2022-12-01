// Import Libs
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Import Styles
import "./movieCard.scss";

// Import Bootstrap Components
import { Card, Button } from "react-bootstrap";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const MovieCard = (props) => {
  if (DEBUG) console.log("render", this);

  const { movie, add, remove, onAddClick, onRemoveClick } = props;
  return (
    <Card className="movie-card h-100 w-100">
      <Card.Img variant="top" src={movie.image_url} />
      <Card.Body>
        <Card.Text>{movie.title}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-right">
        {add && (
          <Button variant="link" onClick={onAddClick}>
            Add
          </Button>
        )}
        {remove && (
          <Button variant="link" onClick={onRemoveClick}>
            Remove
          </Button>
        )}
        {add || remove ? (
          <>
            {/* <Link
              to={{
                pathname: `/movies/${movie._id}/details`,
              }}
              target={"_blank"}
            >
              <Button variant="link">Open</Button>
            </Link> */}
          </>
        ) : (
          <Link
            to={{
              pathname: `/movies/${movie._id}`,
            }}
          >
            <Button variant="link">Open</Button>
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
  // onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
