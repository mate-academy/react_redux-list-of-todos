import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { loadPosts, loadUsers } from '../api/API_DATA';
import Post from './Post';
import SelectPost from './SelectPost';
import '../style/App.css';

const getData = state => ({
  posts: state.posts,
});

const getMethods = dispatch => ({
  setData: data => dispatch({
    type: 'SET_DATA',
    value: data,
  }),
});

class TodosList extends React.Component {
  async componentDidMount() {
    const users = await loadUsers();
    const posts = await loadPosts();

    const postsWithUsers = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
    }));

    this.props.setData(postsWithUsers);
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <NavLink to="/" exact />

        <div className="App">
          <Route
            exact
            path="/"
            render={() => (
              <div>
                {posts.map(post => (
                  <div>
                    <Post post={post} />
                  </div>
                ))}
              </div>
            )}
          />

          <Route
            exact
            path="/ViewPost/post/:id?"
            render={({ match }) => (posts
              ? (
                <SelectPost
                  id={match.params.id}
                />
              )
              : null)
            }
          />
        </div>
      </div>
    );
  }
}

TodosList.propTypes = {
  posts: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default connect(
  getData,
  getMethods
)(TodosList);
