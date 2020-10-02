import React from "react";
// import {Dispatch} from 'redux';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

function Header(props) {
  console.log(props.isLoggedIn, "header");
  console.log(props.loggedInUser, "header");
  return (
    <>
      <header className="header container">
        <NavLink to="/">
          <h1 className="logo">Conduit</h1>
        </NavLink>
        <nav className="header-nav">
          {/* <ul className="nav-menu">
            {props.isLoggedIn ? (
              <AuthenticatedHeader user={props.loggerInUser.username} />
            ) : (
              <UnauthenticatedHeader />
            )}
          </ul> */}
          <UnauthenticatedHeader />
        </nav>
      </header>
    </>
  );
}

function AuthenticatedHeader(props) {
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">New Post</NavLink>
      </li>
      <li>
        <NavLink to="/">Settings</NavLink>
      </li>
      <li>
        <NavLink to="/">{props.user}</NavLink>
      </li>
    </>
  );
}

function UnauthenticatedHeader() {
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
    </>
  );
}

function mapState(state) {
  return state.user;
}

export default connect(mapState)(Header);
