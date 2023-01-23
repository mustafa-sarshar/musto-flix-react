// Import Libs
import React from "react";
import axios from "axios";
import SERVER_ADDRESS from "../../../config/serverInfo";

// Import Redux
import { connect } from "react-redux";
import { setFilter } from "../../../store/actions";
import notifier from "../../../utils/notifiers";

// Import Styles
import "./styles.scss";

// Import Bootstrap Components
import { Card, Row, Col } from "react-bootstrap";

// Import Custom Components
import VisibilityFilterView from "../../visibilityFilterView";
import MovieCard from "../../movieCard";

// EnvVars
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const UserAllMoviesView = (props) => {
  const { movies, userFavorites, parent } = props;
  const movieDefault = {
    title: "no movie yet ❗",
    image_url: "https://via.placeholder.com/50",
  };

  let moviesFiltered = [...movies];
  const { visibilityFilter } = props;
  if (visibilityFilter !== "") {
    moviesFiltered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  const handleAddFavorites = async (movieId, movieTitle, parent) => {
    const { userData } = parent.state;
    const duplicate = userData.favList.indexOf(movieId);

    if (duplicate === -1) {
      const token = localStorage.getItem("token");
      const { username } = userData;
      if (movieId && username && token) {
        const res = await addMovieToFavorites(movieId, username, token);

        if (res) {
          const userUpdate = { ...userData };
          const favoritesUpdate = [...userUpdate.favList, movieId];
          userUpdate.favList = [...favoritesUpdate];
          parent.setState({ userData: { ...userUpdate } });
          localStorage.setItem("favorites", favoritesUpdate.toString());
          notifier.notifySuccess(`${movieTitle} added.`, {
            autoClose: 2000,
          });
        }
      }
    }
  };
  const addMovieToFavorites = async (movieId, username, token) => {
    console.log("Add");
    const reqInstance = axios.create({
      headers: { Authorization: `Bearer ${token}` },
    });
    try {
      const res = await reqInstance.patch(
        `${SERVER_ADDRESS}/users/${username}/favorites/${movieId}`
      );
      return true;
    } catch (err) {
      console.error("Error:", err.message);
      return false;
    }
  };

  return (
    <Card>
      <Card.Header>All Other Movies:</Card.Header>
      <Card.Body>
        <Row>
          <Col md={12} className="mb-2">
            <VisibilityFilterView visibilityFilter={visibilityFilter} />
          </Col>
        </Row>
        <Row>
          {movies.length === 0 ? (
            <Col xl={3} lg={4} md={6} sm={12} className="mb-1">
              <MovieCard movie={movieDefault} />
            </Col>
          ) : (
            moviesFiltered.map((movie) => {
              if (userFavorites.indexOf(movie._id) === -1) {
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
                        handleAddFavorites(movie._id, movie.title, parent)
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
  );
};

const mapStateToProps = (state) => {
  if (DEBUG) console.log("mapStateToProps", state);

  return {
    movies: state.movies,
    visibilityFilter: state.visibilityFilter,
  };
};

export default connect(mapStateToProps, { setFilter })(UserAllMoviesView);
