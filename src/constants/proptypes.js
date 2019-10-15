import PropTypes from 'prop-types';

export const ButtonProps = {
  text: PropTypes.string.isRequired,
};

const userShape = PropTypes.shape({
  name: PropTypes.string,
}).isRequired;

export const UserProps = {
  user: userShape,
};

export const TodoItemSortProps = {
  // onSortChange: PropTypes.func.isRequired,
  sortMethod: PropTypes.string.isRequired,
};

export const TodoItemProps = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: userShape,
  }).isRequired,
};

export const TodoListProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.number,
      user: userShape,
    }).isRequired,
  ).isRequired,
};
