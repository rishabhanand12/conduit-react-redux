import { SIGNUP, LOGIN, FETCH_USER, LOGOUT_USER } from "../types";
export default function userReducer(
  state = { isLoggedIn: false, loggedInUser: null },
  action
) {
  switch (action.type) {
    case SIGNUP:
      return Object.assign(
        {},
        (state = { isLoggedIn: true, loggedInUser: action.payload })
      );
    case LOGIN:
      return Object.assign(
        {},
        (state = { isLoggedIn: true, loggedInUser: action.payload })
      );
    case FETCH_USER:
      return Object.assign(
        {},
        (state = { isLoggedIn: true, loggedInUser: action.payload })
      );
    case LOGOUT_USER:
      return Object.assign(
        {},
        (state = { isLoggedIn: false, loggedInUser: null })
      );
    default:
      return state;
  }
}
