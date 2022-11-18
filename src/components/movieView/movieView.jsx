import React from "react";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

export default class MovieView extends React.Component {
    render() {
        if (DEBUG) console.log("render", this);

        const { movie, onBackClick } = this.props;
        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.image_url} />
                </div>
                <div className="movie-title">
                    <span className="movie-title__label">Title</span>
                    <br />
                    <span className="movie-title__value">{movie.title}</span>
                </div>
                <hr />
                <div className="movie-description">
                    <span className="movie-description__label">
                        Description
                    </span>
                    <br />
                    <span className="movie-description__value">
                        {movie.des}
                    </span>
                </div>
                <button
                    onClick={() => {
                        onBackClick(null);
                    }}
                >
                    Back
                </button>
            </div>
        );
    }
    componentDidMount() {
        if (DEBUG) console.log("componentDidMount", this);
    }
    componentDidUpdate() {
        if (DEBUG) console.log("componentDidUpdate", this);
    }
    componentWillUnmount() {
        if (DEBUG) console.log("componentWillUnmount", this);
    }
}
