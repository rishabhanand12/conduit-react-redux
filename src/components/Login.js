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
        <form onSubmit={this.handleSubmit}>
          <section className="text-gray-700 body-font">
            <div className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Login
              </h2>
              <input
                onChange={this.handleChange}
                className="bg-white rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-base px-4 py-2 mb-4"
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.email}
              />
              <input
                onChange={this.handleChange}
                className="bg-white rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-base px-4 py-2 mb-4"
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
              />
              <input
                type="submit"
                className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                value="Login"
              />
            </div>
          </section>
        </form>
      </>
    );
  }
}

function mapState(state) {
  return state.tags;
}

export default connect(mapState)(withRouter(Login));
