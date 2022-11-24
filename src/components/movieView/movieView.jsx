// Import Libs
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Import Styles
import "./movieView.scss";

// Import Bootstrap Components
import { Col } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MovieView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            director: "",
            genre: "",
        };

        axios
            .get(
                `https://musto-movie-api.herokuapp.com/directors/${this.props.movie.director_id}`
            )
            .then((res) => {
                this.setState({ director: res.data.name });
            })
            .catch((err) => {
                console.log(err.message);
            });
        axios
            .get(
                `https://musto-movie-api.herokuapp.com/genres/${this.props.movie.genre_id}`
            )
            .then((res) => {
                this.setState({ genre: res.data.name });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
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
                <div className="movie-director">
                    <span className="movie-title__label">Director</span>
                    <br />
                    <span className="movie-title__value">
                        {this.state.director}
                    </span>
                </div>
                <div className="movie-director">
                    <span className="movie-title__label">Genre</span>
                    <br />
                    <span className="movie-title__value">
                        {this.state.genre}
                    </span>
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
                <MyButton
                    btnName="btnBack"
                    btnLabel="Back"
                    btnOnClick={() => {
                        onBackClick(null);
                    }}
                />
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

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        des: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
