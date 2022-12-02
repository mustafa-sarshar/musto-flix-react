// Import Libs
import { combineReducers } from "redux";

// Import Actions
import { SET_FILTER, SET_MOVIES, SET_FAVORITES } from "../actions/actions";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const visibilityFilter = (state = "", action) => {
  if (DEBUG) console.log("ReducerVisibilityFilter:", state, action);
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
};

const movies = (state = [], action) => {
  if (DEBUG) console.log("ReducerMovies:", state, action);
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
};

const favorites = (state = [], action) => {
  if (DEBUG) console.log("ReducerFavorites:", state, action);
  switch (action.type) {
    case SET_FAVORITES:
      return action.value;
    default:
      return state;
  }
};

// const moviesApp = (state = {}, action) => {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action),
//     favorites: favorites(state.movies, action),
//   };
// };

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  favorites,
});

export default moviesApp;
