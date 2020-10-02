import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import App from "./containers/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);