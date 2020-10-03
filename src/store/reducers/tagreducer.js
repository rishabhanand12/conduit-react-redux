import { FETCH_TAGS } from "../types";

export default function tagReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_TAGS:
      return Object.assign({}, state, { tags: action.payload });
    default:
      return state;
  }
}
