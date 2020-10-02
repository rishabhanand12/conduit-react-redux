import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Article extends React.Component {
  state = {
    article: null,
  };

  componentDidMount = async () => {
    try {
      let articleSlug = this.props.match.params.id;
      let url = `https://conduit.productionready.io/api/articles/${articleSlug}`;
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      this.setState({
        article: data.article,
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
        {/* <section className="comment-section">
            
        </section> */}
      </>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(withRouter(Article));
