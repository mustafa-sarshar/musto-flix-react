// Define Actions
const SET_MOVIES = "SET_MOVIES";
const SET_FILTER = "SET_FILTER";
const SET_FAVORITES = "SET_FAVORITES";
const SET_ALERT = "SET_ALERT";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const setMovies = (value) => {
  if (DEBUG) console.log("SetMovies:", value);
  return { type: SET_MOVIES, value };
};

const setFilter = (value) => {
  if (DEBUG) console.log("SetFilter:", value);
  return { type: SET_FILTER, value };
};

const setFavorites = (value) => {
  if (DEBUG) console.log("setFavorites:", value);
  return { type: SET_FAVORITES, value };
};

const setAlert = (value, variant) => {
  if (DEBUG) console.log("setAlert:", value, variant);
  return { type: SET_ALERT, value, variant };
};

export {
  SET_MOVIES,
  setMovies,
  SET_FILTER,
  setFilter,
  SET_FAVORITES,
  setFavorites,
  SET_ALERT,
  setAlert,
};
