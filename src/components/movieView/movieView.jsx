// Import Libs
import React from "react";
import axios from "axios";
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

    this.state = {
      director: "",
      genre: "",
      stars: [],
    };

    console.log("props:", this.props);
    if (this.props.movie.director_id) {
      axios
        .get(
          `https://musto-movie-api.onrender.com/directors/${this.props.movie.director_id}`,
        )
        .then((res) => {
          this.setState({ director: res.data.name });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    if (this.props.movie.genre_id) {
      axios
        .get(
          `https://musto-movie-api.onrender.com/genres/${this.props.movie.genre_id}`,
        )
        .then((res) => {
          this.setState({ genre: res.data.name });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    if (this.props.movie.stars.length > 0) {
      this.props.movie.stars.map((star) => {
        axios
          .get(`https://musto-movie-api.onrender.com/actors/${star}`)
          .then((res) => {
            this.setState({
              stars: [...this.state.stars, res.data.name],
            });
            console.log(res.data.name);
          })
          .catch((err) => {
            console.log(err.message);
            this.setState({
              stars: [...this.state.stars, "NA"],
            });
          });
      });
    }
  }

  render() {
    if (DEBUG) console.log("render", this);

    const { movie, onBackClick } = this.props;

    return (
      <Row>
        <Col>
          <div className="movie-view">
            <Card>
              <Card.Header>
                <div className="movie-title">
                  <h2>{movie.title}</h2>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="movie-poster">
                  <img src={movie.image_url} />
                </div>
                <Table striped bordered hover size="sm" className="movie-table">
                  <tbody>
                    <tr>
                      <th scope="row">Genre</th>
                      <td>
                        {this.state.genre}
                        <Link to={`/genres/${movie.genre_id}`}>
                          <Button variant="link">more</Button>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Director</th>
                      <td>
                        {this.state.director}
                        <Link to={`/directors/${movie.director_id}`}>
                          <Button variant="link">more</Button>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Stars</th>
                      <td>{this.state.stars.join(" | ")}</td>
                    </tr>
                  </tbody>
                </Table>
                <p className="movie-description">{movie.des}</p>
              </Card.Body>
              <Card.Footer className="text-left">
                <MyButton
                  btnStyle="text-green border-none cursor-pointer add-padding--5px background-transparent"
                  btnLabel="back"
                  btnOnClick={() => {
                    onBackClick(null);
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
    if (DEBUG) console.log("componentDidMount", this);
  }
  componentDidUpdate() {
    if (DEBUG) console.log("componentDidUpdate", this);
  }
  componentWillUnmount() {
    if (DEBUG) console.log("componentWillUnmount", this);
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
