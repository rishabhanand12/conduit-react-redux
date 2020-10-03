import React from "react";
import { connect } from "react-redux";

class Comment extends React.Component {
  render() {
    let { comments } = this.props;
    if (!comments) return <h1>Loading</h1>;
    return (
      <>
        <ul>
          {comments.map((elem) => {
            return (
              <li className="comment-list">
                <p className="comment-body">{elem.body}</p>
                <div className="comment-author-info">
                  <img
                    className="comment-avatar"
                    src={elem.author.image}
                    alt=""
                  />
                  <div>
                    <h6 className="comment-author-username">{elem.author.username}</h6>
                    <time className="article-date">
                      {new Date(elem.createdAt).toDateString()}
                    </time>
                  </div>
                  {this.props.loggedInUser === elem.author.username ? (
                    <button>delete</button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

function mapState(state) {
  return state.user;
}
export default connect(mapState)(Comment);
