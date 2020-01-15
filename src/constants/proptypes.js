import PropTypes from 'prop-types';

export const buttonProps = {
  text: PropTypes.string.isRequired,
};

const userShape = PropTypes.shape({
  name: PropTypes.string,
}).isRequired;

export const userProps = {
  user: userShape,
};

export const todoItemSortProps = {
  sortMethod: PropTypes.string.isRequired,
};

export const todoItemProps = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: userShape,
  }).isRequired,
};

export const todoListProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.number,
      user: userShape,
    }).isRequired,
  ).isRequired,
};
