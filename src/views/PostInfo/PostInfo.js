import React, { Component } from "react";

class PostInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }
  componentDidMount() {
    fetch(`http://hn.algolia.com/api/v1/items/${this.props.match.params.post}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res,
        });
      });
  }
  render() {
    return <p>{JSON.stringify(this.state.data)}</p>;
  }
}
export default PostInfo;
