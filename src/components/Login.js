import React from "react";
import { connect } from "react-redux";
import { login } from "../store/action";
import { withRouter } from "react-router-dom";
class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let loginUrl = "https://conduit.productionready.io/api/users/login";
      let res = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: this.state }),
      });
      let data = await res.json();
      localStorage.setItem("key", data.user.token);
      this.props.dispatch(login(data.user));
      this.props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        <section className="form-container auth-container">
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <section className="">
              <div className="">
                <h2 className="">Login</h2>
                <input
                  onChange={this.handleChange}
                  className=""
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                />
                <input
                  onChange={this.handleChange}
                  className=""
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                />
                <input type="submit" className="" value="Login" />
              </div>
            </section>
          </form>
        </section>
      </>
    );
  }
}

function mapState(state) {
  return state.tags;
}

export default connect(mapState)(withRouter(Login));
