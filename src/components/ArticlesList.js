import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchArticles } from "../store/action";

class ArticleList extends React.Component {
  handleTabClick = async (tab) => {
    let { activeTab } = this.props.state.tags;
    let authToken = localStorage.getItem("key");
    if (tab === "yourfeed") {
      let articleUrl =
        "https://conduit.productionready.io/api/articles/feed?limit=10&offset=0";
      let response = await fetch(articleUrl, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      let data = await response.json();
      console.log(data);
      this.props.dispatch(fetchArticles(data.articles));
    } else if (tab === "global") {
      let articleUrl =
        "https://conduit.productionready.io/api/articles?limit=10&offset=0";
      let res = await fetch(articleUrl);
      let data = await res.json();
      this.props.dispatch(fetchArticles(data.articles));
    } else {
      let articleUrl = `https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=${activeTab}`;
      let response = await fetch(articleUrl);
      let data = await response.json();
      this.props.dispatch(fetchArticles(data.articles));
    }
  };

  render() {
    let { isLoggedIn } = this.props.state.user;
    let { articles } = this.props.state.articles;
    let { activeTab } = this.props.state.tags;
    return (
      <>
        <section className="main-articles margin">
          <div className="articles">
            {isLoggedIn ? (
              <span
                onClick={() => this.handleTabClick("yourfeed")}
                className="tag-span"
              >
                Your Feed
              </span>
            ) : null}
            <span
              onClick={() => this.handleTabClick("global")}
              className="tag-span"
            >
              Global Feed
            </span>
            {activeTab ? (
              <span
                onClick={() => this.handleTabClick(activeTab)}
                className="tag-span"
              >
                {activeTab}
              </span>
            ) : null}
            {articles.map((elem, index) => {
              return (
                <>
                  <li key={index} className="article-list">
                    <div>
                      <div className="article-hero-div">
                        <Link to={`/profile/${elem.author.username}`}>
                          <img
                            className="article-avatar"
                            src={elem.author.image}
                            alt=""
                          ></img>
                        </Link>
                        <div className="article-author-div">
                          <Link
                            className="article-author"
                            to={`/profile/${elem.author.username}`}
                          >
                            <h4>{elem.author.username}</h4>
                          </Link>
                          <time className="article-date">
                            {new Date(elem.createdAt).toDateString()}
                          </time>
                        </div>
                        <span>
                          <i class="fal fa-heart"></i>
                          {elem.favoritesCount}
                        </span>
                      </div>
                    </div>
                    <Link to={`/article/${elem.slug}`}>
                      <div id={elem.slug}>
                        <p className="article-title">{elem.title}</p>
                        <p className="article-description">
                          {elem.description}
                        </p>
                      </div>
                      <button className="btn read-more-btn">
                        Read More...
                      </button>
                    </Link>
                  </li>
                </>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(ArticleList);
