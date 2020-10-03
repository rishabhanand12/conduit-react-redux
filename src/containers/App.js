import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Home from "../components/Home";
import Header from "../components/Header";
import Article from "../components/Article";
import Profile from "../components/Profile";
import NewArticle from "../components/NewArticle";
import Settings from "../components/Settings";
import { login } from "../store/action";
class App extends React.Component {
  async componentDidMount() {
    try {
      let authToken = localStorage.getItem("key");
      if (authToken) {
        let userUrl = "https://conduit.productionready.io/api/user";
        let user = await fetch(userUrl, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        let userData = await user.json();
        this.props.dispatch(login(userData.user));
      }
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <>
        <Header />
        {/* <Hero />   */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/article/:id">
            <Article />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/new">
            <NewArticle />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </>
    );
  }
}

function mapstate(state) {
  return { state };
}

export default connect(mapstate)(App);
