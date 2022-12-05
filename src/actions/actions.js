// Define Actions
const SET_MOVIES = "SET_MOVIES";
const SET_FILTER = "SET_FILTER";
const SET_FAVORITES = "SET_FAVORITES";
const SET_USER = "SET_USER";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const setMovies = (payload) => {
  if (DEBUG) console.log("SetMovies:", payload);
  return { type: SET_MOVIES, payload };
};

const setFilter = (payload) => {
  if (DEBUG) console.log("SetFilter:", payload);
  return { type: SET_FILTER, payload };
};

const setFavorites = (payload) => {
  if (DEBUG) console.log("setFavorites:", payload);
  return { type: SET_FAVORITES, payload };
};

const setUser = (payload) => {
  if (DEBUG) console.log("setUser:", payload);
  return { type: SET_USER, payload };
};

export {
  SET_MOVIES,
  setMovies,
  SET_FILTER,
  setFilter,
  SET_FAVORITES,
  setFavorites,
  SET_USER,
  setUser,
};
