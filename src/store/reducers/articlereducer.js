import { FETCH_ARTICLES } from "../types";

export default function articleReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return Object.assign({}, state, { articles: action.payload });
    // return {...state, articles: [....articles,action.payload]}
    default:
      return state;
  }
}
