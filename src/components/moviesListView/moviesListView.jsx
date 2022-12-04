// Import Libs
import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { setFavorites } from "../../actions/actions";

// Import Styles
import "./moviesListView.scss";

// Import Bootstrap Components
import { Col } from "react-bootstrap";

// Import Custom Components
import MovieCard from "../movieCard/movieCard";
import LoadingView from "../loadingView/loadingView";
import VisibilityFilterView from "../visibilityFilterView/visibilityFilterView";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MoviesListView extends React.Component {
  constructor(props) {
    super(props);
    if (DEBUG) console.log("constructor", this);
  }

  render() {
    const { movies, visibilityFilter, favorites } = this.props;
    if (DEBUG)
      console.log(
        "MoviesListView",
        "Movies::",
        movies,
        "visibilityFilter:",
        visibilityFilter,
        "favorites:",
        favorites
      );

    if (movies.length > 0) {
      let filteredMovies = movies;

      if (visibilityFilter !== "") {
        filteredMovies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(visibilityFilter.toLowerCase())
        );
      }

      if (!movies)
        return (
          <Col sm={12} lg={8}>
            <LoadingView />
          </Col>
        );

      return (
        <>
          <Col md={12} className="mb-2">
            <VisibilityFilterView visibilityFilter={visibilityFilter} />
          </Col>
          {filteredMovies.map((movie) => (
            <Col lg={3} md={4} sm={6} key={movie._id} className="mb-3">
              <MovieCard
                showAddBtn={
                  !favorites.find((movie_id) => movie_id === movie._id)
                }
                onAddClick={async () => {
                  await this.handleAddFavorite(movie._id);
                }}
                showRemoveBtn={favorites.find(
                  (movie_id) => movie_id === movie._id
                )}
                onRemoveClick={async () => {
                  await this.handleRemoveFavorite(movie._id);
                }}
                showOpenBtn={true}
                movie={movie}
              />
            </Col>
          ))}
        </>
      );
    }
  }

  async handleRemoveFavorite(movie_id) {
    const { favorites } = this.props;
    const found = favorites.indexOf(movie_id);

    if (found > -1) {
      const token = localStorage.getItem("token");
      const { user: username } = this.props;

      if (movie_id && username && token) {
        const res = await this.removeMovieFromFavorites(
          movie_id,
          username,
          token
        );

        if (res) {
          const favoritesUpdate = favorites.filter((item) => item !== movie_id);
          localStorage.setItem("favorites", favoritesUpdate.toString());
          this.props.setFavorites([...favoritesUpdate]);
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
      console.log("Res:", res);
      return true;
    } catch (err) {
      console.error("Error:", err.message);
      return false;
    }
  }

  async handleAddFavorite(movie_id) {
    const { favorites } = this.props;
    const duplicate = favorites.indexOf(movie_id);

    if (duplicate === -1) {
      const token = localStorage.getItem("token");
      const { user: username } = this.props;
      if (movie_id && username && token) {
        const res = await this.addMovieToFavorites(movie_id, username, token);

        if (res) {
          const favoritesUpdate = [...favorites, movie_id];
          localStorage.setItem("favorites", [...favoritesUpdate].toString());
          this.props.setFavorites([...favoritesUpdate]);
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
    visibilityFilter: state.visibilityFilter,
  };
};

export default connect(mapStateToProps, { setFavorites })(MoviesListView);
