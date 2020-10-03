import React from "react";
import { connect } from "react-redux";
import { fetchTags } from "../store/action";
import ArticleList from "./ArticlesList";
import Tags from "./Tag";

class Home extends React.Component {
  async componentDidMount() {
    try {
      // let authToken = localStorage.getItem("key");
      // if (authToken) {
      //   let articleUrl =
      //     "https://conduit.productionready.io/api/articles/feed?limit=10&offset=0";
      //   let response = await fetch(articleUrl, {
      //     headers: {
      //       Authorization: `Token ${authToken}`,
      //     },
      //   });
      //   let data = await response.json();
      //   console.log(data);
      //   this.props.dispatch(fetchArticles(data.articles));
      // } else {
      //   let articleUrl =
      //     "https://conduit.productionready.io/api/articles?limit=10&offset=0";
      //   let res = await fetch(articleUrl);
      //   let data = await res.json();
      //   this.props.dispatch(fetchArticles(data.articles));
      let tagUrl = "https://conduit.productionready.io/api/tags";
      let tags = await fetch(tagUrl);
      let tagList = await tags.json();
      this.props.dispatch(fetchTags(tagList.tags));
      // }
      // let authToken = localStorage.getItem("key");
      if (this.props.state.isLoggedIn) {
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    // if (!this.props.state.articles) {
    //   return <h1>Loading</h1>;
    // }
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
