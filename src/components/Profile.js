import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchArticles } from "../store/action";
import { Link } from "react-router-dom";
class Profile extends React.Component {
  state = {
    user: null,
    article: null,
    favoritedArticle: null,
  };
  componentDidMount = async () => {
    try {
      let profileSlug = this.props.match.params.id;
      let profileUrl = `https://conduit.productionready.io/api/profiles/${profileSlug}`;
      let res = await fetch(profileUrl);
      let data = await res.json();
      this.setState({
        user: data.profile,
      });
      let articleUrl = `https://conduit.productionready.io/api/articles?author=${profileSlug}`;
      let response = await fetch(articleUrl);
      let article = await response.json();
      console.log(article);
      this.props.dispatch(fetchArticles(article.articles));
    } catch (err) {
      console.error(err);
    }
  };

  handleTabClick = async (tab) => {
    let profileSlug = this.props.match.params.id;
    if (tab === "myarticle") {
      let articleUrl = `https://conduit.productionready.io/api/articles?author=${profileSlug}`;
      let response = await fetch(articleUrl);
      let article = await response.json();
      console.log(article);
      this.props.dispatch(fetchArticles(article.articles));
    } else if (tab === "favorite") {
      let articleUrl = `https://conduit.productionready.io/api/articles?favorited=${profileSlug}&limit   =5&offset=0`;
      let response = await fetch(articleUrl);
      let article = await response.json();
      console.log(article);
      this.props.dispatch(fetchArticles(article.articles));
    }
  };

  render() {
    let { user } = this.state;
    let { articles } = this.props.state.articles;
    if (!user || !articles) {
      return <h1>Loading</h1>;
    }
    return (
      <>
        <section className="">
          <img className="article-avatar" src={user.image} alt="" />
          <h2>{user.username}</h2>
          <button>Follow {user.username}</button>
        </section>
        <section>
          <span onClick={() => this.handleTabClick("myarticle")}>
            My Articles
          </span>
          <span onClick={() => this.handleTabClick("favorite")}>
            Favorited Articles
          </span>
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
                      <p className="article-description">{elem.description}</p>
                    </div>
                    <button className="btn read-more-btn">Read More...</button>
                  </Link>
                </li>
              </>
            );
          })}
        </section>
      </>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(withRouter(Profile));
