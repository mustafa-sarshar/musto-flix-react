import React from "react";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

export default class MovieCard extends React.Component {
    render() {
        if (DEBUG) console.log("render", this);

        const { movie, onMovieClick } = this.props;
        return (
            <div className="movie-card" onClick={() => onMovieClick(movie)}>
                {movie.title}
            </div>
        );
    }
}
