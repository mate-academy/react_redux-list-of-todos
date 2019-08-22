import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import User from './User';
import Comments from './Comments';

const getData = state => ({
  posts: state.posts,
  comments: state.comments,
});

const getMethods = dispatch => ({
  setComment: data => dispatch({
    type: 'SET_COMMENT',
    value: data,
  }),
});

class SelectPost extends React.Component {
  state = {
    title: '',
    errorsMap: {
      title: '',
    },
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const errorsMap = {};

    this.setState((state) => {
      if (!state.title) {
        errorsMap.title = 'Enter comment, please';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      this.props.setComment({
        id: this.props.id,
        commentId: Date.now(),
        title: this.state.title,
      });
    });

    this.setState({
      title: '',
    });
  }

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errorsMap: {
        title: '',
      },
    });
  }

  render() {
    const { posts, id, comments } = this.props;
    const { title, errorsMap } = this.state;
    const currentComments = comments
      .filter(comment => +(comment.id) === posts[id - 1].id);

    return (
      <div>
        <Link to="/" exact className="back-btn">
          Back to Posts
        </Link>
        <div className="selected-post_list">
          <User userItem={posts[id - 1].user} />
          <p className="post_title">
            <b>Title</b>
            {' '}
            {posts[id - 1].title}
          </p>
          <p className="post_body">{posts[id - 1].body}</p>

          <p
            className="post_comments"
          >
            {currentComments.length }
            {' '}
            {currentComments.length < 2
              ? 'Comment'
              : 'Comments'
            }
          </p>
          {currentComments.map(comment => (
            <Comments key={comment.id} comment={comment} />
          ))}
        </div>

        <form
          onSubmit={this.handleFormSubmit}
          className="form"
        >
          <label htmlFor="form-input">
            <input
              className="form-field_input"
              value={title}
              type="text"
              name="title"
              placeholder="Enter comment"
              onChange={this.handleChange}
            />
          </label>
          <div className="form-field_error">
            {errorsMap.title && (<div>{errorsMap.title}</div>)}
          </div>
        </form>
      </div>
    );
  }
}

SelectPost.propTypes = {
  comments: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    commentId: PropTypes.number,
  }).isRequired,
  posts: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default connect(
  getData,
  getMethods
)(SelectPost);
