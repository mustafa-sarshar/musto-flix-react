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

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const mapStateToProps = (state) => {
  const { visibilityFilter, favorites } = state;
  return { visibilityFilter, favorites };
};

class MoviesListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { movies, visibilityFilter } = this.props;
    let { favorites } = this.props;
    console.log("Favs:", favorites);
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

      return filteredMovies.map((movie) => (
        <Col lg={3} md={4} sm={6} key={movie._id} className="mb-3">
          <MovieCard
            showAddBtn={!favorites.find((movie_id) => movie_id === movie._id)}
            onAddClick={async () => {
              await this.handleAddFavorite(movie._id);
            }}
            showRemoveBtn={favorites.find((movie_id) => movie_id === movie._id)}
            onRemoveClick={async () => {
              const favoritesUpdate = favorites.filter(
                (favorite) => favorite !== movie._id
              );
              await this.props.setFavorites([...favoritesUpdate]);
            }}
            showOpenBtn={true}
            movie={movie}
          />
        </Col>
      ));
    }
  }

  componentDidMount() {
    console.log("Mounted:", this.props);
  }
  async handleRemoveFavorite(movie_id) {
    const { favorites } = localStorage.getItem("favorites").split(",");
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
          this.props.setState({ favorites: [...favoritesUpdate] });
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
      const username = localStorage.getItem("user");
      if (movie_id && username && token) {
        const res = await this.addMovieToFavList(movie_id, username, token);

        if (res) {
          const favoritesUpdate = [...favorites, movie_id];
          this.props.setFavorites([...favoritesUpdate]);
          console.log("Favorites:", favoritesUpdate);
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

export default connect(mapStateToProps, { setFavorites })(MoviesListView);
