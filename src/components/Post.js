import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Comments from './Comments';
import User from './User';

const getData = state => ({
  comments: state.comments,
});

class Post extends React.Component {
  state = {
    showComment: false,
  }

  render() {
    const { post, comments } = this.props;

    const currentComments = comments
      .filter(comment => +(comment.id) === post.id);

    return (
      <div>

        <li
          className="post_list"
        >
          <Link
            className="post_list-link"
            to={`/ViewPost/post/${post.id}`}
          >
            <User userItem={post.user} currentComments={currentComments} />

            <p className="post_title">
              <b>Title</b>
              {' '}
              {post.title}
            </p>

            <p className="post_body">{post.body}</p>

          </Link>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
            className="show_comments"
            onClick={() => this.setState(state => ({
              showComment: !state.showComment,
            }))}
          >
            <p className="view-comments">
              {this.state.showComment
                ? 'Hide comments'
                : 'View comments'}
            </p>
          </div>
          {
            this.state.showComment
              ? currentComments.map(comment => (
                <Comments key={comment.id} comment={comment} />))
              : null
          }
        </li>
      </div>
    );
  }
}

Post.propTypes = {
  comments: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    commentId: PropTypes.number,
  }).isRequired,
  post: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
};

export default connect(
  getData,
  null,
)(Post);
