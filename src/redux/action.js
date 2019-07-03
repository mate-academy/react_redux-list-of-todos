import { getData } from '../utils';

export const DATA_REQUESTED = 'dataRequested';
export const DATA_LOADED = 'dataLoaded';

export const dataRequested = () => {
  return dispatch => {
    dispatch({
      type: DATA_REQUESTED
    });
    Promise.all([
      getData('https://jsonplaceholder.typicode.com/todos'),
      getData('https://jsonplaceholder.typicode.com/users'),
    ])
      .then(([todos, users]) => {
        const usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
        const todosWithUser = todos.map(todo => ({ ...todo, user: usersMap[todo.userId] }));
        dispatch({
          type: DATA_LOADED,
          payload: todosWithUser
        });
      });
  }
}

export const dataLoaded = (payload) => ({
  type: DATA_LOADED,
  payload
})
