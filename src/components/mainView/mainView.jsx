import React from "react";
import axios from "axios";

import MovieCard from "../movieCard/movieCard";
import MovieView from "../movieView/movieView";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

export default class MainView extends React.Component {
    constructor() {
        super();
        if (DEBUG) console.log("constructor:", this);

        this.state = {
            movies: [],
            selectedMovie: null,
        };
    }
    render() {
        if (DEBUG) console.log("render:", this);

        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) {
            return <div className="main-view"></div>;
        } else {
            return (
                <div className="main-view">
                    {selectedMovie ? (
                        <MovieView
                            movie={selectedMovie}
                            onBackClick={(newSelectedMovie) => {
                                this.setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    ) : (
                        movies.map((movie) => (
                            <MovieCard
                                key={movie._id}
                                movie={movie}
                                onMovieClick={(movie) => {
                                    this.setSelectedMovie(movie);
                                }}
                            />
                        ))
                    )}
                </div>
            );
        }
    }
    componentDidMount() {
        if (DEBUG) console.log("componentDidMount:", this);

        axios
            .get("https://musto-movie-api.herokuapp.com/movies")
            .then((res) => {
                this.setState({
                    movies: res.data,
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    componentDidUpdate() {
        if (DEBUG) console.log("componentDidUpdate", this);
    }
    componentWillUnmount() {
        if (DEBUG) console.log("componentWillUnmount", this);
    }
    setSelectedMovie(newSelectedMovie) {
        if (DEBUG) console.log("setSelectedMovie:", this);

        this.setState({
            selectedMovie: newSelectedMovie,
        });
    }
}
