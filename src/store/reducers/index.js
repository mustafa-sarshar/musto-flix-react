// Import Libs
import { combineReducers } from "redux";

// Import Actions
import { SET_FILTER, SET_MOVIES, SET_FAVORITES, SET_USER } from "../actions";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const visibilityFilter = (state = "", action) => {
  if (DEBUG) console.log("ReducerVisibilityFilter:", state, action);
  switch (action.type) {
    case SET_FILTER:
      state = action.payload;
      break;
  }
  return state;
};

const movies = (state = [], action) => {
  if (DEBUG) console.log("ReducerMovies:", state, action);
  switch (action.type) {
    case SET_MOVIES:
      state = action.payload;
      break;
  }
  return state;
};

const favorites = (state = [], action) => {
  if (DEBUG) console.log("ReducerFavorites:", state, action);
  switch (action.type) {
    case SET_FAVORITES:
      state = action.payload;
      break;
  }
  return state;
};

const user = (state = "", action) => {
  if (DEBUG) console.log("User:", state, action);
  switch (action.type) {
    case SET_USER:
      state = action.payload;
      break;
  }
  return state;
};

const moviesAppReducer = combineReducers({
  visibilityFilter,
  movies,
  favorites,
  user,
});

export default moviesAppReducer;
