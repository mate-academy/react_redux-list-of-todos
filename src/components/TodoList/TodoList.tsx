/* eslint-disable max-len */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../app/store';
import TodoItem from './TodoItem';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

const mapState = ({ todos, filter }: RootState) => {
  return {
    todos,
    filter,
  };
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const getFilteredTodos = (todos: Todo[], status: Status, query: string): Todo[] => {
  return todos.filter((todo) => {
    switch (status) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  }).filter((todo) => {
    if (query === '') {
      return true;
    }

    return todo.title.toLowerCase().includes(query.toLowerCase());
  });
};

const TodoList: React.FC<Props> = ({ todos, filter }) => {
  const visibleTodos = getFilteredTodos(todos, filter.status, filter.query);

  return (
    <>
      {visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default connector(TodoList);
