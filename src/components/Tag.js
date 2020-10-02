import React from "react";
import { connect } from "react-redux";
import { fetchTagArticles } from "../store/action";

class Tags extends React.Component {
  handleTagClick = async (tag) => {
    let articleUrl = `https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=${tag}`;
    let response = await fetch(articleUrl);
    let data = await response.json();
    this.props.dispatch(fetchTagArticles({ tag: tag, articles: data.articles }));
    // this.props.dispatch(setTags(tag));
  };
  render() {
    let { tags } = this.props;
    return (
      <>
        <aside className="tags-div margin">
          <h3>Popular Tags</h3>
          <div className="tags">
            {tags.map((elem, index) => {
              return (
                <span onClick={() => this.handleTagClick(elem)} key={index}>
                  {elem}
                </span>
              );
            })}
          </div>
        </aside>
      </>
    );
  }
}

function mapState(state) {
  return state.tags;
}

export default connect(mapState)(Tags);
