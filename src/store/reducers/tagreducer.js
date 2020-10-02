import { FETCH_TAGS, SET_TAG } from "../types";

export default function tagReducer(state = { activeTab: null }, action) {
  switch (action.type) {
    case FETCH_TAGS:
      return Object.assign({}, state, { tags: action.payload });
    case SET_TAG:
      return Object.assign({}, state, { activeTab: action.payload });
    default:
      return state;
  }
}
