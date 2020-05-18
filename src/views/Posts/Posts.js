import React, { Component } from "react";
import "./Posts.scss";

class Posts extends Component {
  ref = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pageNumber: 0,
      numbers : []
    };
    this.timer = ""
  }

  loadMorePages = () => {
    if(this.state.pageNumber && !this.state.numbers.includes(this.state.pageNumber)){
      fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.pageNumber}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState((prevState) => ({
          posts: [...prevState.posts, ...res.hits],
          pageNumber : prevState.pageNumber + 1,
          numbers : [...prevState.numbers,prevState.pageNumber]
        }));
      });
    }
  }

  componentDidMount() {
    fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.pageNumber}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState((prevState) => ({
          posts: [...prevState.posts, ...res.hits],
          pageNumber : prevState.pageNumber + 1,
          numbers : [...prevState.numbers,prevState.pageNumber]
        }));
      });

      this.timer = setInterval(this.loadMorePages,10000);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio === 1) {
            this.loadMorePages();
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 1.0,
        }
      );
      if (this.ref.current) {
        observer.observe(this.ref.current);
      }
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  handlePostClick = (item) => {
    this.props.history.push(`/info/${item.objectID}`)
  }

  render() {
    return (
      <div className="posts-view">
        <div className="posts" id="posts-cell">
          <table id="posts">
            <tbody>
              <tr>
                <th className="title">Title</th>
                <th>URL</th>
                <th>Created_at</th>
                <th>Author</th>
              </tr>
              {this.state.posts.map((item, index) => {
                return (
                  <tr onClick={()=>this.handlePostClick(item)}>
                    <td className="title">{item.title}</td>
                    <td>{item.url}</td>
                    <td>{item.created_at}</td>
                    <td>{item.author}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div ref={this.ref} className="loading">
            <h6>Loading more posts...</h6>
          </div>
        </div>
      </div>
    );
  }
}
export default Posts;
