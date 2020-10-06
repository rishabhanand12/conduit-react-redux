import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../store/action";
import { withRouter } from "react-router-dom";
class Settings extends React.Component {
  state = {
    image: null,
    username: null,
    email: null,
    password: "",
    bio: null,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleLogout = () => {
    localStorage.clear("key");
    this.props.history.push("/");
    this.props.dispatch(logoutUser());
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let authToken = localStorage.getItem("key");
      let url = "https://conduit.productionready.io/api/user";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({ user: this.state }),
      });
      await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        <section className="settings-section">
          <h2 className="settings-hero">Your Settings</h2>
          <form
            className="settings-form form-container"
            onSubmit={this.handleSubmit}
          >
            <input
              onChange={this.handleChange}
              type="text"
              name="image"
              value={this.state.image}
              placeholder="URL of profile picture"
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
            />
            <textarea
              onChange={this.handleChange}
              name="bio"
              value={this.state.bio}
              placeholder="Bio"
            />
            <input
              onChange={this.handleChange}
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
            />
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="New Password"
              value={this.state.password}
            />
            <input type="submit" value="Update Settings" />
          </form>
          <button onClick={this.handleLogout} btn className="btn logout-btn">
            Or Click here to Logout
          </button>
        </section>
      </>
    );
  }
}
function mapState(state) {
  return { state };
}
export default connect(mapState)(withRouter(Settings));
