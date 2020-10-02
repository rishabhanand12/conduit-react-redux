import React from "react";
// import {Dispatch} from 'redux';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

// function Header(props) {
//   console.log(props.isLoggedIn, "header");
//   console.log(props.loggedInUser, "header");
//   return (
//     <>
//       <header className="header container">
//         <NavLink to="/">
//           <h1 className="logo">Conduit</h1>
//         </NavLink>
//         <nav className="header-nav">
//           {/* <ul className="nav-menu">
//             {props.isLoggedIn ? (
//               <AuthenticatedHeader user={props.loggerInUser.username} />
//             ) : (
//               <UnauthenticatedHeader />
//             )}
//           </ul> */}
//           <UnauthenticatedHeader />
//         </nav>
//       </header>
//     </>
//   );
// }

// function AuthenticatedHeader(props) {
//   return (
//     <>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/">New Post</NavLink>
//       </li>
//       <li>
//         <NavLink to="/">Settings</NavLink>
//       </li>
//       <li>
//         <NavLink to="/">{props.user}</NavLink>
//       </li>
//     </>
//   );
// }

// function UnauthenticatedHeader() {
//   return (
//     <>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/login">Login</NavLink>
//       </li>
//       <li>
//         <NavLink to="/signup">Signup</NavLink>
//       </li>
//     </>
//   );
// }

// function mapState(state) {
//   return state.user;
// }

// export default connect(mapState)(Header);

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
