import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    //props from react router, match is inside params
    // params lists all wildcard tokens that exist in url
    // id: , comments: (if we had comments)
    this.props.fetchPost(id);
  }
  //componentWillMount works just the same...

  onDeleteClick() {
    const { id } = this.props.match.params;
    // can also use this.props.post.id
    // bad approach since assumes already post exists
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // posts[ownProps.match.params.id] don't want to do this
    //sends in all posts; big data dependency
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">Home</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
        Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  //ownProps has all the props headed to PostsNewShow
  // rather than send in all posts above just get the one post we want
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
