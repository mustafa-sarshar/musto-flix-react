// Import Libs
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import Styles
import "./genreView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const GenreView = (props) => {
  if (DEBUG) console.log("render", this);

  const [genre, setGenre] = useState({});

  const { onBackClick } = props;
  const { id: genre_id } = useParams();
  const token = localStorage.getItem("token");

  const fetchData = (genre_id, token) => {
    axios
      .get(`https://musto-movie-api.onrender.com/genres/${genre_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setGenre(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (genre_id && token) {
    fetchData(genre_id, token);
  }

  return (
    <Row>
      <Col>
        <div className="genre-view">
          <Card>
            <Card.Header>
              <div className="genre-title">
                <h2>{genre?.name && genre.name}</h2>
              </div>
            </Card.Header>
            <Card.Body>
              <p className="genre-des">{genre?.des && genre.des}</p>
            </Card.Body>
            <Card.Footer className="text-left">
              <MyButton
                btnStyle="text-green border-none cursor-pointer add-padding--5px background-transparent"
                btnLabel="back"
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
};

export default GenreView;
