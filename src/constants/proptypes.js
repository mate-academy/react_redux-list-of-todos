import PropTypes from 'prop-types';

export const AppPropTypes = {
  isLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  loadTodos: PropTypes.func.isRequired,
};

export const TodoListPropTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortByTitle: PropTypes.func.isRequired,
};

export const TodoItemPropTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export const UserPropTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};
