import React from "react";

export default class Comment extends React.Component {
  render() {
    let { comments } = this.props;
    return (
      <>
        <ul>
          {comment.map((elem) => {
            <li>
              <p>{elem.body}</p>
              <img src={(elem.author, image)} alt="" />
              <h6>{elem.author.username}</h6>
              <time className="article-date">
                {new Date(elem.createdAt).toDateString()}
              </time>
              <button>delete</button>
            </li>;
          })}
        </ul>
      </>
    );
  }
}
