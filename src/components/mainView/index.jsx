// Import Libs
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { setMovies, setUser, setFavorites } from "../../store/actions";
import SERVER_ADDRESS from "../../config/serverInfo";

// Import Styles
import "./styles.scss";

// Import Bootstrap Components
import { Row, Col } from "react-bootstrap";

// Import Custom Components
import LoginView from "../loginView";
import RegistrationView from "../registrationView";
import MovieView from "../movieView";
import MoviesListView from "../moviesListView";
import UserProfileView from "../userProfileView";
import DirectorView from "../directorView";
import ActorView from "../actorView";
import GenreView from "../genreView";
import MenuBarView from "../menuBarView";
import FooterView from "../footerView";
import LoadingView from "../loadingView";

// EnvVars
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MainView extends React.Component {
  constructor(props) {
    super(props);
    if (DEBUG) console.log("constructor:", this);
  }

  render() {
    if (DEBUG) console.log("render:", this);
    const { user, movies } = this.props;

    return (
      <>
        <MenuBarView user={user} />
        <hr />
        <Row className="main-view justify-content-md-center mt-1">
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
                return <MoviesListView />;
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
              render={async () => {
                localStorage.clear();
                await this.props.setUser("");
                window.open("/", "_self");
              }}
            />
          </Switch>
        </Row>
        <FooterView />
      </>
    );
  }
  componentDidMount() {
    if (DEBUG) console.log("componentDidMount:", this);

    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem("user"));
      this.props.setFavorites(localStorage.getItem("favorites").split(","));
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

    this.props.setUser(authData.user.username);
    this.props.setFavorites(authData.user.favList);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    localStorage.setItem("favorites", authData.user.favList.toString());
    this.getMovies(authData.token);
  }

  // Fetching methods
  getMovies(token) {
    axios
      .get(`${SERVER_ADDRESS}/movies/populated`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async handleRemoveFavMovie(movie_id) {
    const { favorites } = this.props;
    const found = favorites.indexOf(movie_id);

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
          const favoritesUpdate = favorites.filter((item) => item !== movie_id);
          this.props.setFavorites([...favoritesUpdate]);
          localStorage.setItem("favorites", favoritesUpdate.toString());
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
        `${SERVER_ADDRESS}/users/${username}/favorites/${movie_id}`
      );
      console.log("Res:", res);
      return true;
    } catch (err) {
      console.error("Error:", err.message);
      return false;
    }
  }

  async handleAddFavMovie(movie_id) {
    const { favorites } = this.props;
    const duplicate = favorites.indexOf(movie_id);

    if (duplicate === -1) {
      const token = localStorage.getItem("token");
      const { user: username } = this.props;
      if (movie_id && username && token) {
        const res = await this.addMovieToFavList(movie_id, username, token);

        if (res) {
          const favoritesUpdate = [...favList, movie_id];
          this.props.setFavorites([...favoritesUpdate]);
          localStorage.setItem("favorites", favoritesUpdate.toString());
          console.log("favorites:", favoritesUpdate);
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
        `${SERVER_ADDRESS}/users/${username}/favorites/${movie_id}`
      );
      console.log("Res:", res);
      return true;
    } catch (err) {
      console.error("Error:", err.message);
      return false;
    }
  }
}

const mapStateToProps = (state) => {
  if (DEBUG) console.log("mapStateToProps", state);
  return {
    user: state.user,
    movies: state.movies,
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps, { setUser, setMovies, setFavorites })(
  MainView
);
