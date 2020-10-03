import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    let { isLoggedIn, loggedInUser } = this.props.state.user;
    return (
      <>
        <header className="header container">
          <NavLink to="/">
            <h1 className="logo">Conduit</h1>
          </NavLink>
          <nav className="header-nav">
            {isLoggedIn ? (
              <AuthenticatedHeader user={loggedInUser.username} />
            ) : (
              <UnAuthenticatedHeader />
            )}
          </nav>
        </header>
      </>
    );
  }
}

function AuthenticatedHeader(props) {
  return (
    <>
      <ul>
        <li>
          <NavLink activeClassName="active-link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active-link" to="/new">
            New Article
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active-link" to="/settings">
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active-link" to={`/profile/${props.user}`}>
            {props.user}
          </NavLink>
        </li>
      </ul>
    </>
  );
}

function UnAuthenticatedHeader() {
  return (
    <>
      <ul>
        <li>
          <NavLink activeClassName="active-link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active-link" to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </>
  );
}

function mapState(state) {
  return { state };
}
export default connect(mapState)(Header);
