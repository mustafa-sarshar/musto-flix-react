// Import Libs
import React from "react";
import axios from "axios";

// Import Styles
import "./mainView.scss";

// Import Bootstrap Components
import { Row, Col } from "react-bootstrap";

// Import Custom Components
import LoginView from "../loginView/loginView";
import RegistrationView from "../registrationView/registrationView";
import MovieCard from "../movieCard/movieCard";
import MovieView from "../movieView/movieView";
import MyNavBar from "../myNavBar/myNavBar";

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
      showRegistrationPanel: false,
    };
  }
  render() {
    if (DEBUG) console.log("render:", this);

    const { movies, selectedMovie, user, showRegistrationPanel } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView

    if (!user) {
      if (!showRegistrationPanel) {
        return (
          <LoginView
            onLoggedIn={(user) => this.onLoggedIn(user)}
            onRequestRegister={() => this.onRequestRegister()}
          />
        );
      } else {
        return (
          <RegistrationView onSignedIn={(user) => this.onSignedIn(user)} />
        );
      }
    }

    // Before the movies have been loaded
    if (movies.length === 0) {
      return (
        <div className="main-view">
          <p>Data is loading ...</p>
        </div>
      );
    } else {
      return (
        <>
          <MyNavBar
            user={user}
            onLoggedOutClick={() => this.onLoggedOut()}
            onSignUpClick={() => this.onRequestRegister()}
          />
          <Row className="main-view justify-content-md-center">
            {/* If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned */}
            {selectedMovie ? (
              <Col md={8}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ) : (
              movies.map((movie) => (
                <Col sm={12} md={6} lg={4} xl={3} key={movie.title}>
                  <MovieCard
                    key={movie.title}
                    movie={movie}
                    onMovieClick={(movie) => {
                      this.setSelectedMovie(movie);
                    }}
                  />
                </Col>
              ))
            )}
          </Row>
        </>
      );
    }
  }
  componentDidMount() {
    if (DEBUG) console.log("componentDidMount:", this);

    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
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
  onLoggedIn(authData) {
    if (DEBUG) console.log("AuthData:", authData);
    this.setState({
      user: authData.user.username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
  }
  getMovies(token) {
    axios
      .get("https://musto-movie-api.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onRequestRegister() {
    this.onLoggedOut();
    this.setState({
      showRegistrationPanel: true,
    });
  }
  // When a user successfully signs in, this function sets the `user` property in state to that *particular user
  onSignedIn() {
    this.setState({
      showRegistrationPanel: false,
    });
  }

  // To log out and clear the localStorage and the user state variable
  onLoggedOut() {
    // localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }
}

export default MainView;
