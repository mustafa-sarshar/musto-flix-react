// Import Libs
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Import Styles
import "./mainView.scss";

// Import Components
import LoginView from "../loginView/loginView";
import RegistrationView from "../registrationView/registrationView";
import MovieCard from "../movieCard/movieCard";
import MovieView from "../movieView/movieView";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MainView extends React.Component {
    constructor() {
        super();
        if (DEBUG) console.log("constructor:", this);

        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
        };
    }
    render() {
        if (DEBUG) console.log("render:", this);

        const { movies, selectedMovie, user } = this.state;

        // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
        if (!user)
            return (
                <>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    <br />
                    <br />
                    <br />
                    <p style={{ color: "red" }}>
                        Just for testing purposes NOW!
                    </p>
                    <RegistrationView
                        onSignedIn={(user) => this.onSignedIn(user)}
                    />
                </>
            );

        // Before the movies have been loaded
        if (movies.length === 0) {
            return (
                <div className="main-view">
                    <p>Data is loading ...</p>
                </div>
            );
        } else {
            return (
                <div className="main-view">
                    {/* If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned */}
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
    // When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie
    setSelectedMovie(movie) {
        if (DEBUG) console.log("setSelectedMovie:", this);

        this.setState({
            selectedMovie: movie,
        });
    }
    // When a user successfully logs in, this function updates the `user` property in state to that *particular user
    onLoggedIn(user) {
        this.setState({
            user,
        });
    }
    onRequestSignIn(message) {
        console.log(message);
    }
    // When a user successfully signs in, this function sets the `user` property in state to that *particular user
    onSignedIn(user) {
        console.log("SignedIn");
    }
}

export default MainView;
