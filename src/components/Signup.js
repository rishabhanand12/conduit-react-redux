import React from "react";
import { connect } from "react-redux";
import { signUp } from "../store/action";

class Signup extends React.Component {
  state = {
    username: "",
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
      let reqUrl = "https://conduit.productionready.io/api/users";
      let res = await fetch(reqUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: this.state }),
      });
      console.log(res.statusCode);
      let data = await res.json();
      console.log(data);
      localStorage.setItem("key", data.user.token);
      this.props.dispatch(signUp(data.user));
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
                <h2 className="">Sign Up</h2>
                <input
                  onChange={this.handleChange}
                  className=""
                  placeholder="Full Name"
                  type="text"
                  name="username"
                  value={this.state.username}
                />
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
                <input type="submit" className="" value="Sign Up" />
              </div>
            </section>
          </form>
        </section>
      </>
    );
  }
}

export default connect()(Signup);
