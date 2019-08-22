import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

const getMethods = dispatch => ({
  handleDelete: data => dispatch({
    type: 'DELETE_COMMENT',
    value: data,
  }),
});

const Comments = ({ comment, handleDelete }) => (
  <div className="comments">
    <b> Unknown: </b>
    {console.log(comment)}
    <p className="comment">{comment.title}</p>
    <div
      className="delete-comment"
      onClick={() => handleDelete(comment.commentId)}
    >
      {' '}
      Delete
    </div>
  </div>
);

Comments.propTypes = {
  handleDelete: PropTypes.func,
  comment: PropTypes.shape({
    title: PropTypes.string,
    commentId: PropTypes.number,
  }).isRequired,
};

export default connect(
  null,
  getMethods
)(Comments);
