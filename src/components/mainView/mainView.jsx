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
import UserProfileView from "../userProfileView/userProfileView";
import DirectorView from "../directorView/directorView";
import ActorView from "../actorView/actorView";
import GenreView from "../genreView/genreView";
import MenuBar from "../menuBar/menuBar";
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
      user: null,
      favList: null,
    };
  }

  render() {
    if (DEBUG) console.log("render:", this);

    const { movies, user, favList } = this.state;

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
                      <LoadingView />
                    </Col>
                  );
                }
                if (user && favList) {
                  return movies.map((movie) => (
                    <Col lg={3} md={4} sm={6} key={movie._id} className="mb-3">
                      <MovieCard
                        showAddBtn={
                          !favList.find((movie_id) => movie_id === movie._id)
                        }
                        onAddClick={() => this.handleAddFavMovie(movie._id)}
                        showRemoveBtn={favList.find(
                          (movie_id) => movie_id === movie._id
                        )}
                        onRemoveClick={() =>
                          this.handleRemoveFavMovie(movie._id)
                        }
                        showOpenBtn={true}
                        movie={movie}
                      />
                    </Col>
                  ));
                }
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
              path="/movies/:id"
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
                      <LoadingView />
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(
                        (movie) => movie._id === match.params.id
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:id/details"
              render={({ match }) => {
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
                      <LoadingView />
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(
                        (movie) => movie._id === match.params.id
                      )}
                      exitButton={true}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/directors/:id"
              render={({ history }) => {
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
                      <LoadingView />
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <DirectorView
                      movies={movies}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/actors/:id"
              render={({ history }) => {
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
                      <LoadingView />
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <ActorView
                      movies={movies}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:id"
              render={({ history }) => {
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
                    <Col>
                      <LoadingView />
                    </Col>
                  );
                }
                return (
                  <Col md={8}>
                    <GenreView
                      movies={movies}
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
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                return (
                  <Col>
                    <UserProfileView
                      movies={movies}
                      username={match.params.username}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path={`/user-update`}
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                }
                return <Redirect to="/" />;
              }}
            />

            <Route
              exact
              path={"/logout"}
              render={() => {
                localStorage.clear();
                this.setState({
                  user: null,
                });
                window.open("/", "_self");
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
        favList: localStorage.getItem("favList").split(","),
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

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user
  onLoggedIn(authData) {
    if (DEBUG) console.log("AuthData:", authData);
    this.setState({
      user: authData.user.username,
      favList: authData.user.favList,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    localStorage.setItem("favList", authData.user.favList.toString());
    this.getMovies(authData.token);
  }

  // Fetching methods
  getMovies(token) {
    axios
      .get("https://musto-movie-api.onrender.com/movies/populated", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async handleRemoveFavMovie(movie_id) {
    const { favList } = this.state;
    const found = favList.indexOf(movie_id);

    if (found > -1) {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("user");

      if (movie_id && username && token) {
        const res = await this.removeMovieFromFavList(
          movie_id,
          username,
          token
        );

        if (res) {
          const favListUpdate = favList.filter((item) => item !== movie_id);
          this.setState({ favList: [...favListUpdate] });
          localStorage.setItem("favList", favListUpdate.toString());
        }
      } else {
        console.error("Not enough Info");
      }
    } else {
      console.error("Not Found in the FavList");
    }
  }
  async removeMovieFromFavList(movie_id, username, token) {
    const reqInstance = axios.create({
      headers: { Authorization: `Bearer ${token}` },
    });
    try {
      const res = await reqInstance.delete(
        `https://musto-movie-api.onrender.com/users/${username}/favorites/${movie_id}`
      );
      console.log("Res:", res);
      return true;
    } catch (err) {
      console.error("Error:", err.message);
      return false;
    }
  }

  async handleAddFavMovie(movie_id) {
    const { favList } = this.state;
    const duplicate = favList.indexOf(movie_id);

    if (duplicate === -1) {
      const token = localStorage.getItem("token");
      const { user: username } = this.state;
      if (movie_id && username && token) {
        const res = await this.addMovieToFavList(movie_id, username, token);

        if (res) {
          const favListUpdate = [...favList, movie_id];
          this.setState({ favList: [...favListUpdate] });
          localStorage.setItem("favList", favListUpdate.toString());
          console.log("FavList:", favListUpdate);
        }
      }
    }
  }
  async addMovieToFavList(movie_id, username, token) {
    const reqInstance = axios.create({
      headers: { Authorization: `Bearer ${token}` },
    });
    try {
      const res = await reqInstance.patch(
        `https://musto-movie-api.onrender.com/users/${username}/favorites/${movie_id}`
      );
      console.log("Res:", res);
      return true;
    } catch (err) {
      console.error("Error:", err.message);
      return false;
    }
  }
}

export default MainView;
