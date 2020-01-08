import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  adress: PropTypes.shape({
    street: PropTypes.string,
    suite: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.string,
    geo: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
    }),
  }),
  compane: PropTypes.shape({
    name: PropTypes.string,
    catchPhrase: PropTypes.string,
    bs: PropTypes.string,
  }),
});

const todoListShape = PropTypes.shape({
  userid: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.shape(userShape),
});

export const AppComponentProps = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoListShape)),
  sortTodos: PropTypes.func,
  resetTodos: PropTypes.func,
  isLoading: PropTypes.bool,
  getTodos: PropTypes.func,
};

export const UserComponentProps = {
  user: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
  }),
};

export const TodoListProps = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoListShape)),
};

export const TodoItemProps = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.shape(userShape),
  }),
  deleteTodo: PropTypes.func,
};
