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

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const UserFavoriteMoviesView = (props) => {
  const { movies, userFavorites, parent } = props;
  const movieDefault = {
    title: "no favorite movie yet ❗",
    image_url: "https://via.placeholder.com/50",
  };

  let moviesFiltered = [...movies];
  // const { visibilityFilter } = props;
  // if (visibilityFilter !== "") {
  //   moviesFiltered = movies.filter((movie) =>
  //     movie.title.toLowerCase().includes(visibilityFilter.toLowerCase())
  //   );
  // }

  const handleRemoveFavorites = async (movieId, movieTitle, parent) => {
    const { userData } = parent.state;
    const found = userData.favList.indexOf(movieId);

    if (found > -1) {
      const token = localStorage.getItem("token");
      const { username } = userData;
      if (movieId && username && token) {
        const res = await removeMovieFromFavorites(movieId, username, token);

        if (res) {
          const favoritesUpdate = userData.favList.filter(
            (item) => item !== movieId
          );
          const userUpdate = { ...userData };
          userUpdate.favList = [...favoritesUpdate];
          parent.setState({ userData: { ...userUpdate } });
          localStorage.setItem("favorites", favoritesUpdate.toString());
          notifier.notifyInfo(`${movieTitle} removed.`, {
            autoClose: 2000,
          });
        }
      } else {
        console.error("Not enough Info");
      }
    } else {
      console.error("Not Found in the FavList");
    }
  };

  const removeMovieFromFavorites = async (movieId, username, token) => {
    const reqInstance = axios.create({
      headers: { Authorization: `Bearer ${token}` },
    });
    try {
      const res = await reqInstance.delete(
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
      <Card.Header>Favorite Movies:</Card.Header>
      <Card.Body>
        {/* <Row>
          <Col md={12} className="mb-2">
            <VisibilityFilterView visibilityFilter={visibilityFilter} />
          </Col>
        </Row> */}

        <Row>
          {userFavorites.length === 0 ? (
            <Col xl={3} lg={4} md={6} sm={12} className="mb-1">
              <MovieCard movie={movieDefault} />
            </Col>
          ) : (
            moviesFiltered.map((movie) => {
              if (userFavorites.indexOf(movie._id) > -1) {
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
                      onRemoveClick={() => {
                        handleRemoveFavorites(movie._id, movie.title, parent);
                      }}
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

export default connect(mapStateToProps, { setFilter })(UserFavoriteMoviesView);
