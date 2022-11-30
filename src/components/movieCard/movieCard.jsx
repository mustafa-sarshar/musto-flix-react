// Import Libs
import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link } from "react-router-dom";

// Import Styles
import "./movieCard.scss";

// Import Bootstrap Components
import { Card, Button } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MovieCard extends React.Component {
  render() {
    if (DEBUG) console.log("render", this);

    const { movie, onMovieClick } = this.props;
    return (
      <Card className="movie-card h-100 w-100">
        <Card.Img variant="top" src={movie.image_url} />
        <Card.Body>
          <Card.Text>{movie.title}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-right">
          <Router>
            <Link to={`/movies/${movie._id}`}>
              {/* <MyButton
                btnStyle="text-green border-none cursor-pointer add-padding--5px background-transparent"
                btnLabel="more"
                // btnOnClick={() => {
                //   onMovieClick(movie);
                // }}
              /> */}
              <Button variant="link">Open</Button>
            </Link>
          </Router>
        </Card.Footer>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
