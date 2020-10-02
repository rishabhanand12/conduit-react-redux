import React from "react";
import { connect } from "react-redux";
import { setTags } from "../store/action";

class Tags extends React.Component {
  handleTabClick = async (tag) => {
    this.props.dispatch(setTags(tag));
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
                <span onClick={() => this.handleTabClick(elem)} key={index}>
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
