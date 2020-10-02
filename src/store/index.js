import { createStore, combineReducers } from "redux";
import articleReducer from "./reducers/articlereducer";
import tagReducer from "./reducers/tagreducer";
import userReducer from "./reducers/userReducer";

let rootReducer = combineReducers({
  user: userReducer,
  tags: tagReducer,
  articles: articleReducer,
});

let store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
