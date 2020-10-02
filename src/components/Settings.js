import React from "react";
import { connect } from "react-redux";

class Settings extends React.Component {
  state = {
    image: null,
    username: this.props.state.user.loggedInUser.username,
    email: this.props.state.user.loggedInUser.email,
    password: "",
    bio: null,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
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
      let data = await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        <h2>Your Settings</h2>
        <form onSubmit={this.handleSubmit}>
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
          />
          <textarea
            onChange={this.handleChange}
            name="bio"
            value={this.state.bio}
            placeholder="bio"
          />
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            value={this.state.email}
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
        <button>Or Click here to Logout</button>
      </>
    );
  }
}

export default connect(mapState)(Settings);
