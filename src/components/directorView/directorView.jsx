// Import Libs
import React, { useState } from "react";
import {
  useParams,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

// Import Styles
import "./directorView.scss";

// Import Bootstrap Components
import { Row, Col, Table, Card } from "react-bootstrap";

// Import Custom Components
import { MyButton } from "../myButton/myButton";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const DirectorView = (props) => {
  const { id: director_id } = useParams();
  let { path, url } = useRouteMatch();
  console.log(path, url);

  const [director, setDirector] = useState();
  const accessToken = localStorage.getItem("token");

  const getDirector = (token) => {
    axios
      .get(`https://musto-movie-api.onrender.com/directors/${director_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        setDirector(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  if (accessToken) {
    // getDirector(accessToken);
  }

  return (
    <>
      <div>Director View</div>
      <br />
      <p>{director_id}</p>
      <p>{JSON.stringify(director)}</p>
    </>
  );
};

export default DirectorView;
