import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Comment from "./Comment";

class Article extends React.Component {
  state = {
    article: null,
    comments: null,
  };

  componentDidMount = async () => {
    try {
      let articleSlug = this.props.match.params.id;
      let url = `https://conduit.productionready.io/api/articles/${articleSlug}`;
      let res = await fetch(url);
      let data = await res.json();
      this.setState({
        article: data.article,
      });
      let commentUrl = `https://conduit.productionready.io/api/articles/${articleSlug}/comments`;
      let commentResponse = await fetch(commentUrl);
      let commentData = await commentResponse.json();
      this.setState({
        comments: commentData.comments,
      });
    } catch (err) {
      console.error(err);
    }
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
      let articleSlug = this.props.match.params.id;
      let url = `https://conduit.productionready.io/api/articles/${articleSlug}/comments`;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
        },
        "Content-Type": "pplication/json;charset=utf-8",
      });
      let data = await response.json();
      this.setState({
        comments: this.state.comments.concat(data.comment),
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    let { isLoggedIn } = this.props.state.user;
    let { article } = this.state;
    if (!article) return <h1>Loading</h1>;
    return (
      <>
        <section className="articles-hero">
          <div className="container">
            <h2>{article.title}</h2>
            <div class="article-author-info">
              <img
                className="article-avatar"
                src={article.author.image}
                alt=""
              />
              <div className="article-author-name-div">
                <h3>{article.author.username}</h3>
                <time className="article-date">
                  {new Date(article.createdAt).toDateString()}
                </time>
              </div>
              <button className="btn unfollow-btn">
                + Follow {article.author.username}
              </button>
              <span>
                {article.favorited ? (
                  <i className="fas fa-heart"></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}
              </span>
            </div>
          </div>
        </section>
        <div className="container article-body">
          <p>{article.description}</p>
        </div>
        <section className="comment-section form-container">
          {!isLoggedIn ? (
            <p>
              <Link to="'login">Login</Link> or<Link to="'login">Signup</Link>{" "}
              to Comment
            </p>
          ) : (
            <form className="comment-form" onSubmit={this.handleSubmit}>
              <textarea
                onChange={this.handleChange}
                name="body"
                placeholder="Write a comment"
                value={this.state.body}
                required
              />
              <input type="submit" value="Post Comment" />
            </form>
          )}
          <Comment comments={this.state.comments} />
        </section>
      </>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(withRouter(Article));
