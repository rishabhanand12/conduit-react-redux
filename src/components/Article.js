import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Comment } from "./Comment";

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
  render() {
    let { article } = this.state;
    if (!article) return <h1>Loading</h1>;

    return (
      <>
        <section className="">
          <h2>{article.title}</h2>
          <div>
            <img className="article-avatar" src={article.author.image} alt="" />
            <div>
              <h3>{article.author.username}</h3>
              <time className="article-date">
                {new Date(article.createdAt).toDateString()}
              </time>
            </div>
            <button>+ Follow {article.author.username}</button>
            <button>
              <i class="fal fa-heart" />
            </button>
          </div>
          <div>
            <p>{article.description}</p>
          </div>
        </section>
        <Comment comments={this.state.comments} />
      </>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(withRouter(Article));
