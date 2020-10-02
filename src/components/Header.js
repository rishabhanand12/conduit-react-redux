import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    let { isLoggedIn } = this.props.state.user;
    console.log(isLoggedIn);
    console.log(this.props.state)
    return (
      <>
        <header className="header container">
          <NavLink to="/">
            <h1 className="logo">Conduit</h1>
          </NavLink>
          <nav className="header-nav">
            {isLoggedIn ? (
              <AuthenticatedHeader
                user={this.props.state.user.loggedInUser.username}
              />
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
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/new">New Article</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
        <li>
          <NavLink to="">{props.user}</NavLink>
        </li>
      </ul>
    </>
  );
}

function UnAuthenticatedHeader() {
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </>
  );
}

function mapState(state) {
  return { state };
}
export default connect(mapState)(Header);
