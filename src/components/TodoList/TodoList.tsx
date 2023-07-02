/* eslint-disable max-len */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoTable } from '../TodoTable/TodoTable';

type Props = {
  todos: Todo[] | undefined,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
}) => {
  if (todos?.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
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
      <TodoTable
        todos={todos}
        selectedTodo={selectedTodo}
      />

    </table>
  );
};
