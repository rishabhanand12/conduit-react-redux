import React from "react";
import { fetchArticles } from "../store/action";

export default class Pagination extends React.Component {
  handlePageClick = async (index) => {
    try {
      let { count, count, page } = this.props;
      switch (page) {
        case "home":
          let url = `https://conduit.productionready.io/api/articles/feed?limit=${limit}&offset=${index}`;
          case "profile": 
          let url = ``
      }
    } catch (err) {
      console.error(err);
    }
  };
  render() {
    let { count, limit } = this.props;
    var offsetCount = Math.floor(count / limit);
    let arr = Array.apply(null, { length: offsetCount }).map(
      Number.call,
      Number
    );
    return (
      <ul>
        {arr.map((_e, i) => {
          return <li onClick={() => this.handlePageClick(i)}>{i}</li>;
        })}
      </ul>
    );
  }
}
