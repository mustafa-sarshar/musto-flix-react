// Import Libs
import React from "react";
import axios from "axios";
import { Switch, Route, Redirect } from "react-router-dom";

// Import Styles
import "./mainView.scss";

// Import Bootstrap Components
import { Row, Col } from "react-bootstrap";

// Import Custom Components
import LoginView from "../loginView/loginView";
import RegistrationView from "../registrationView/registrationView";
import MovieCard from "../movieCard/movieCard";
import MovieView from "../movieView/movieView";
import ProfileView from "../profileView/profileView";
import UserUpdateView from "../userUpdateView/userUpdateView";
import DirectorView from "../directorView/directorView";
import ActorView from "../actorView/actorView";
import GenreView from "../genreView/genreView";
import MenuBar from "../navbar/navbar";
import LoadingView from "../loadingView/loadingView";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MainView extends React.Component {
  constructor() {
    super();
    if (DEBUG) console.log("constructor:", this);

    // Initial state is set to null
    this.state = {
      movies: [],
      actors: [],
      directors: [],
      genres: [],
      selectedMovie: null,
      user: null,
      showRegistrationPanel: false,
    };
  }
  render() {
    if (DEBUG) console.log("render:", this);

    const {
      movies,
      actors,
      directors,
      genres,
      selectedMovie,
      user,
      showRegistrationPanel,
    } = this.state;

    return (
      <>
        <MenuBar user={user} />
        <hr />
        <Row className="main-view justify-content-md-center mt-5">
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                if (!user) {
                  return (
                    <Col sm={12} lg={8}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                // Before data have been fetched
                if (movies.length === 0) {
                  return (
                    <Col sm={12} lg={8}>
                      <LoadingView />;
                    </Col>
                  );
                }
                return movies.map((movie) => (
                  <Col lg={3} md={4} sm={6} key={movie._id} className="mb-3">
                    <MovieCard movie={movie} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col sm={12} lg={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col sm={12} lg={8}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                // Before data have been fetched
                if (movies.length === 0) {
                  return (
                    <Col sm={12} lg={8}>
                      <LoadingView />;
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(
                        (movie) => movie._id === match.params.movieId
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/directors/:id"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col sm={12} lg={8}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                // Before data have been fetched
                if (movies.length === 0) {
                  return (
                    <Col sm={12} lg={8}>
                      <LoadingView />;
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <DirectorView
                      director={directors.find(
                        (director) => director._id === match.params.id
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/actors/:id"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col sm={12} lg={8}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                // Before data have been fetched
                if (movies.length === 0) {
                  return (
                    <Col sm={12} lg={8}>
                      <LoadingView />;
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <ActorView
                      actor={actors.find(
                        (actor) => actor._id === match.params.id
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:id"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col sm={12}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                // Before data have been fetched
                if (movies.length === 0) {
                  return (
                    <Col sm={12} lg={8}>
                      <LoadingView />;
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <GenreView
                      genre={genres.find(
                        (genre) => genre._id === match.params.id
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path={`/users/:username`}
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col sm={12}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <ProfileView
                      movies={movies}
                      user={user === match.params.username}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path={`/user-update/${user}`}
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <UserUpdateView
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Switch>
        </Row>
      </>
    );
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
    this.getActors(authData.token);
    this.getDirectors(authData.token);
    this.getGenres(authData.token);
  }

  onShowProfile() {
    console.log("onShowProfile");
  }

  // Fetching methods
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
  getActors(token) {
    axios
      .get("https://musto-movie-api.onrender.com/actors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          actors: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  getDirectors(token) {
    axios
      .get("https://musto-movie-api.onrender.com/directors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          directors: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  getGenres(token) {
    axios
      .get("https://musto-movie-api.onrender.com/genres", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          genres: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default MainView;
