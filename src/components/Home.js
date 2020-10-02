import React from "react";
import { connect } from "react-redux";
import { fetchArticles, fetchTags, login } from "../store/action";
import ArticleList from "./ArticlesList";
import Tags from "./Tag";

class Home extends React.Component {
  async componentDidMount() {
    try {
      let authToken = localStorage.getItem("key");
      if (authToken) {
        let userUrl = "https://conduit.productionready.io/api/user";
        let user = await fetch(userUrl, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        let userData = user.json();
        this.props.dispatch(login(userData.user));
      }
      let articleUrl =
        "https://conduit.productionready.io/api/articles?limit=10&offset=0";
      let res = await fetch(articleUrl);
      let data = await res.json();
      this.props.dispatch(fetchArticles(data.articles));
      let tagUrl = "https://conduit.productionready.io/api/tags";
      let tags = await fetch(tagUrl);
      let tagList = await tags.json();
      this.props.dispatch(fetchTags(tagList.tags));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (!this.props.state.tags.tags) {
      return <h1>Loading</h1>;
    }
    return (
      <>
        <section className="hero">
          <h2>Conduit</h2>
          <p>A Place To Share Knowledge</p>
        </section>
        <div className="main-section container">
          <ArticleList />
          <Tags />
        </div>
      </>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(Home);
