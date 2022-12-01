// Import Libs
import React from "react";
import axios from "axios";

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
      user: null,
    };
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { user } = this.state;

    if (!user) {
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
                  <h2>{user && user.username}</h2>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <UserInfoView user={user} />
                  </Col>
                </Row>
                <Card>
                  <Card.Header>Favorite Movies:</Card.Header>
                  <Card.Body>
                    <Row>
                      {movies.map((movie) => {
                        if (user.favList.indexOf(movie._id) > -1) {
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
                                remove={true}
                                onRemoveClick={() =>
                                  this.handleRemoveFavMovie(movie._id)
                                }
                              />
                            </Col>
                          );
                        }
                      })}
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
                    if (user.favList.indexOf(movie._id) === -1) {
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
                            add={true}
                            onAddClick={() => this.handleAddFavMovie(movie._id)}
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
          user: res.data,
        });
        console.log("user", this.state.user, this);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async handleRemoveFavMovie(movie_id) {
    const { user } = this.state;
    const found = user.favList.indexOf(movie_id);

    if (found > -1) {
      const token = localStorage.getItem("token");
      const { username } = user;
      if (movie_id && username && token) {
        const res = await this.removeMovieFromFavList(
          movie_id,
          username,
          token
        );

        if (res) {
          const favListUpdate = user.favList.filter(
            (item) => item !== movie_id
          );
          const userUpdate = { ...user };
          userUpdate.favList = [...favListUpdate];
          this.setState({ user: { ...userUpdate } });
          console.log("FavList:", user.favList);
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
    const { user } = this.state;
    const duplicate = user.favList.indexOf(movie_id);

    if (duplicate === -1) {
      const token = localStorage.getItem("token");
      const { username } = user;
      if (movie_id && username && token) {
        const res = await this.addMovieToFavList(movie_id, username, token);

        if (res) {
          const userUpdate = { ...user };
          userUpdate.favList = [...userUpdate.favList, movie_id];
          this.setState({ user: { ...userUpdate } });
          console.log("FavList:", user.favList);
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

export default UserProfileView;
