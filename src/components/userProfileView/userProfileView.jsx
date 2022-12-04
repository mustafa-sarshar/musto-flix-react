// Import Libs
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Import Styles
import "./userProfileView.scss";

// Import Bootstrap Components
import { Row, Col, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";
import LoadingView from "../loadingView/loadingView";
import MovieCard from "../movieCard/movieCard";
import UserInfoView from "./userInfoView/userInfoView";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class UserProfileView extends React.Component {
  constructor(props) {
    super(props);

    if (DEBUG) console.log("render", this);

    this.state = {
      userData: null,
    };
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { userData } = this.state;
    const movieDefault = {
      title: "no favorite movie yet ❗",
      image_url: "https://via.placeholder.com/50",
    };

    if (!userData) {
      return (
        <Col>
          <LoadingView />
        </Col>
      );
    }
    return (
      <Row>
        <Col>
          <div className="user-view">
            <Card>
              <Card.Header>
                <div className="user-title">
                  <h2>{userData && userData.username}</h2>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <UserInfoView userData={userData} />
                  </Col>
                </Row>
                <Card>
                  <Card.Header>Favorite Movies:</Card.Header>
                  <Card.Body>
                    <Row>
                      {userData.favList.length === 0 ? (
                        <Col xl={3} lg={4} md={6} sm={12} className="mb-1">
                          <MovieCard movie={movieDefault} />
                        </Col>
                      ) : (
                        movies.map((movie) => {
                          if (userData.favList.indexOf(movie._id) > -1) {
                            return (
                              <Col
                                xl={3}
                                lg={4}
                                md={6}
                                sm={12}
                                key={movie._id}
                                className="mb-1"
                              >
                                <MovieCard
                                  movie={movie}
                                  showRemoveBtn={true}
                                  onRemoveClick={() =>
                                    this.handleRemoveFavorites(movie._id)
                                  }
                                  showOpenBtn={true}
                                />
                              </Col>
                            );
                          }
                        })
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Card.Body>
              <Card.Footer className="text-left">
                <MyButton
                  btnStyle="text-green border-none cursor-pointer add-padding--5px background-transparent"
                  btnLabel="Back"
                  btnOnClick={() => {
                    onBackClick();
                  }}
                />
              </Card.Footer>
            </Card>
            <br />
            <hr />
            <br />
            <Card>
              <Card.Header>All Other Movies:</Card.Header>
              <Card.Body>
                <Row>
                  {movies.map((movie) => {
                    if (userData.favList.indexOf(movie._id) === -1) {
                      return (
                        <Col
                          xl={3}
                          lg={4}
                          md={6}
                          sm={12}
                          key={movie._id}
                          className="mb-1"
                        >
                          <MovieCard
                            movie={movie}
                            showAddBtn={true}
                            onAddClick={() =>
                              this.handleAddFavorites(movie._id)
                            }
                            showOpenBtn={true}
                          />
                        </Col>
                      );
                    }
                  })}
                </Row>
              </Card.Body>
              <Card.Footer className="text-left">
                <MyButton
                  btnStyle="text-green border-none cursor-pointer add-padding--5px background-transparent"
                  btnLabel="Back"
                  btnOnClick={() => {
                    onBackClick();
                  }}
                />
              </Card.Footer>
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    const { username } = this.props;
    if (username && token) {
      this.getUserData(username, token);
    }
  }

  getUserData(username, token) {
    const reqInstance = axios.create({
      headers: { Authorization: `Bearer ${token}` },
    });
    reqInstance
      .get(`https://musto-movie-api.onrender.com/users/${username}`)
      .then((res) => {
        this.setState({
          userData: res.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async handleRemoveFavorites(movie_id) {
    const { userData } = this.state;
    const found = userData.favList.indexOf(movie_id);

    if (found > -1) {
      const token = localStorage.getItem("token");
      const { username } = userData;
      if (movie_id && username && token) {
        const res = await this.removeMovieFromFavorites(
          movie_id,
          username,
          token
        );

        if (res) {
          const favoritesUpdate = userData.favList.filter(
            (item) => item !== movie_id
          );
          const userUpdate = { ...userData };
          userUpdate.favList = [...favoritesUpdate];
          this.setState({ userData: { ...userUpdate } });
          localStorage.setItem("favorites", favoritesUpdate.toString());
        }
      } else {
        console.error("Not enough Info");
      }
    } else {
      console.error("Not Found in the FavList");
    }
  }
  async removeMovieFromFavorites(movie_id, username, token) {
    const reqInstance = axios.create({
      headers: { Authorization: `Bearer ${token}` },
    });
    try {
      const res = await reqInstance.delete(
        `https://musto-movie-api.onrender.com/users/${username}/favorites/${movie_id}`
      );
      return true;
    } catch (err) {
      console.error("Error:", err.message);
      return false;
    }
  }

  async handleAddFavorites(movie_id) {
    const { userData } = this.state;
    const duplicate = userData.favList.indexOf(movie_id);

    if (duplicate === -1) {
      const token = localStorage.getItem("token");
      const { username } = userData;
      if (movie_id && username && token) {
        const res = await this.addMovieToFavorites(movie_id, username, token);

        if (res) {
          const userUpdate = { ...userData };
          const favoritesUpdate = [...userUpdate.favList, movie_id];
          userUpdate.favList = [...favoritesUpdate];
          this.setState({ userData: { ...userUpdate } });
          localStorage.setItem("favorites", favoritesUpdate.toString());
        }
      }
    }
  }
  async addMovieToFavorites(movie_id, username, token) {
    const reqInstance = axios.create({
      headers: { Authorization: `Bearer ${token}` },
    });
    try {
      const res = await reqInstance.patch(
        `https://musto-movie-api.onrender.com/users/${username}/favorites/${movie_id}`
      );
      return true;
    } catch (err) {
      console.error("Error:", err.message);
      return false;
    }
  }
}

UserProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default UserProfileView;
