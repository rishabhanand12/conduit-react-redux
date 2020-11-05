import { FETCH_ARTICLES, FETCH_TAG_ARTICLES } from "../types";

export default function articleReducer(state = { activeTab: null }, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return Object.assign({}, state, {
        activeTab: null,
        articles: action.payload,
      });
    case FETCH_TAG_ARTICLES:
      return Object.assign({}, state, {
        activeTab: action.payload.tag,
        articles: action.payload.articles,
        articleCount: action.payload.articleCount,
      });
    // return {...state, articles: [....articles,action.payload]}
    default:
      return state;
  }
}
