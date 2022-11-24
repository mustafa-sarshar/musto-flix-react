// Import Libs
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

// Import Styles
import "./movieCard.scss";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MovieCard extends React.Component {
    render() {
        if (DEBUG) console.log("render", this);

        const { movie, onMovieClick } = this.props;
        return (
            <Card width="100px" height="100%">
                <Card.Img variant="top" src={movie.image_url} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.des}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="link">
                        Open
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
