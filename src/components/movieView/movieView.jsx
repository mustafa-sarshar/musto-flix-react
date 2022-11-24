// Import Libs
import React from "react";
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
