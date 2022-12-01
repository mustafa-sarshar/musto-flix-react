// Import Libs
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// Import Styles
import "./movieView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card, Button } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";
import LoadingView from "../loadingView/loadingView";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MovieView extends React.Component {
  constructor(props) {
    super(props);

    if (DEBUG) console.log("render", this);

    this.state = {
      director: "",
      genre: "",
      stars: [],
    };

    const { movie } = this.props;

    const fetchData = async (movie) => {
      if (movie.director_id) {
        await axios
          .get(
            `https://musto-movie-api.onrender.com/directors/${movie.director_id}`
          )
          .then((res) => {
            this.setState({ director: res.data.name });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      if (movie.genre_id) {
        await axios
          .get(`https://musto-movie-api.onrender.com/genres/${movie.genre_id}`)
          .then((res) => {
            this.setState({ genre: res.data.name });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      if (movie.stars.length > 0) {
        await movie.stars.map(async (star) => {
          const res = await axios.get(
            `https://musto-movie-api.onrender.com/actors/${star}`
          );
          this.setState({
            stars: [
              ...this.state.stars,
              { _id: res.data._id, name: res.data.name },
            ],
          });
        });
      }
    };
    if (props && movie) {
      fetchData(movie);
    }
  }

  render() {
    const { movie, onBackClick, exitButton } = this.props;
    console.log("Back click:", onBackClick, exitButton);

    if (
      !this.state.director ||
      !this.state.genre ||
      !this.state.stars.length === movie.stars.length
    ) {
      return (
        <Col>
          <LoadingView />
        </Col>
      );
    }

    return (
      <Row>
        <Col>
          <div className="movie-view">
            <Card>
              <Card.Header>
                <div className="movie-title">
                  <h2>{movie && movie.title}</h2>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="movie-poster">
                  <img src={movie && movie.image_url} />
                </div>
                <Table striped bordered hover size="sm" className="movie-table">
                  <tbody>
                    <tr>
                      <th scope="row">Genre</th>
                      <td>
                        <Link to={`/genres/${movie && movie.genre_id}`}>
                          <Button variant="link">{this.state.genre}</Button>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Director</th>
                      <td>
                        <Link to={`/directors/${movie && movie.director_id}`}>
                          <Button variant="link">{this.state.director}</Button>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Stars</th>
                      <td>
                        {this.state.stars.map((star) => {
                          return (
                            <Link to={`/actors/${star._id}`}>
                              <Button variant="link">{star.name}</Button>
                            </Link>
                          );
                        })}
                      </td>
                      {/* <td>{this.state.stars.join(" | ")}</td> */}
                    </tr>
                  </tbody>
                </Table>
                <p className="movie-description">{movie && movie.des}</p>
              </Card.Body>
              <Card.Footer className="text-left">
                {exitButton ? (
                  <div>Hi</div>
                ) : (
                  <MyButton
                    btnStyle="text-green border-none cursor-pointer add-padding--5px background-transparent"
                    btnLabel="Back"
                    btnOnClick={() => {
                      onBackClick();
                    }}
                  />
                )}
              </Card.Footer>
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
