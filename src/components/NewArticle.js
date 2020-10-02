import React from "react";
import { withRouter } from "react-router-dom";
export default class NewArticle extends React.Component {
  state = {
    name: "",
    description: "",
    body: "",
    tagList: [],
  };

  handleChange = ({ target: { name, value } }) => {
    if (name === "tagList") {
      var tags = value.split(" ");
      this.setState({
        [name]: tags,
      });
    }
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let authToken = localStorage.getItem("key");
      let url = "https://conduit.productionready.io/api/articles";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({ article: this.state }),
      });
      let data = await response.json();
      this.props.history.push(`/article/${data.article.slug}`);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="title"
            placeholder="Article Title"
            value={this.state.title}
            required
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="description"
            placeholder="What's this article about?"
            value={this.state.description}
            required
          />
          <textarea
            onChange={this.handleChange}
            name="body"
            placeholder="Write your article(in markdown)"
            value={this.state.body}
            required
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="tagList"
            placeholder="Enter tags"
            value={this.state.tagList.join(" ")}
            required
          />
          <input type="submit" value="Publish Article" />
        </form>
      </>
    );
  }
}
