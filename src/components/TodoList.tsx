import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getingTodos, RootState } from '../store';

const mapState = (state: RootState) => {
  return {
    todos: getingTodos(state),
  };
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & {
  filterBy: string;
  visibleNumberTodos: number[]
};

const TodoList: React.FC<Props> = ({ todos, filterBy, visibleNumberTodos }) => {
  const [start, finish] = visibleNumberTodos;

  let visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'all':
        return true;
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });

  visibleTodos = visibleTodos.slice(start, finish + 1);

  return (
    <ul>
      {visibleTodos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  );
};

export default connector(TodoList);
