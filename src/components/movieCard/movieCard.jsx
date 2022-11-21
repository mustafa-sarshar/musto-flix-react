import React from "react";
import PropTypes from "prop-types";

// Import Styles
import "./movieCard.scss";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MovieCard extends React.Component {
    render() {
        if (DEBUG) console.log("render", this);

        const { movie, onMovieClick } = this.props;
        return (
            <div className="movie-card" onClick={() => onMovieClick(movie)}>
                {movie.title}
                <img
                    className="movie-card__movie-logo"
                    src={movie.image_url}
                    alt={movie.title}
                    height="30px"
                />
            </div>
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
