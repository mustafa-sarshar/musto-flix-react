// Import Libs
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// Import Styles
import "./movieView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card, Button } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

class MovieView extends React.Component {
  constructor(props) {
    super(props);

    if (DEBUG) console.log("render", this);
  }

  render() {
    const { movie, onBackClick } = this.props;

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
                      <th scope="row">Genre(s)</th>
                      <td>
                        {movie.genres.map((genre) => {
                          return (
                            <Link key={genre._id} to={`/genres/${genre._id}`}>
                              <Button key={genre._id} variant="link">
                                {genre.name}
                              </Button>
                            </Link>
                          );
                        })}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Director(s)</th>
                      <td>
                        {movie.directors.map((director) => {
                          return (
                            <Link
                              key={director._id}
                              to={`/directors/${director._id}`}
                              state={{ director: movie.director }}
                            >
                              <Button key={director._id} variant="link">
                                {director.name}
                              </Button>
                            </Link>
                          );
                        })}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Star(s)</th>
                      <td>
                        {movie.stars.map((star) => {
                          return (
                            <Link key={star._id} to={`/actors/${star._id}`}>
                              <Button key={star._id} variant="link">
                                {star.name}
                              </Button>
                            </Link>
                          );
                        })}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <p className="movie-description">{movie && movie.des}</p>
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
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
    directors: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    stars: PropTypes.array.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
