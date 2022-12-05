// Import Libs
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Import Redux
import { connect } from "react-redux";

// Import Styles
import "./userProfileView.scss";

// Import Bootstrap Components
import { Row, Col, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";
import LoadingView from "../loadingView/loadingView";
import UserInfoView from "./userInfoView/userInfoView";
import UserFavoriteMoviesView from "./userFavoriteMoviesView/userFavoriteMoviesView";
import UserAllMoviesView from "./userAllMoviesView/userAllMoviesView";

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
    const { user, username, movies, onBackClick } = this.props;
    const { userData } = this.state;

    if (user !== username) {
      console.log("Hack attack detected");
      window.open("/", "_self");
    }

    if (!userData) {
      return (
        <Col>
          <LoadingView />
        </Col>
      );
    }

    if (!movies)
      return (
        <Col sm={12} lg={8}>
          <LoadingView />
        </Col>
      );

    return (
      <Row>
        <Col>
          <div className="user-view">
            <Card>
              <Card.Header>
                <div className="user-title">
                  <h2>{userData.username}</h2>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <UserInfoView userData={userData} />
                  </Col>
                </Row>
                <UserFavoriteMoviesView
                  parent={this}
                  userFavorites={[...userData.favList]}
                />
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
              <Card.Body>
                <UserAllMoviesView
                  parent={this}
                  userFavorites={[...userData.favList]}
                />
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
}

UserProfileView.propTypes = {
  username: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  if (DEBUG) console.log("mapStateToProps", state);

  return {
    user: state.user,
    movies: state.movies,
    visibilityFilter: state.visibilityFilter,
  };
};

export default connect(mapStateToProps, {})(UserProfileView);
