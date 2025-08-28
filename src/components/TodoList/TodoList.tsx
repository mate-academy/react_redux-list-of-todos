import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  isModalOpen: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, isModalOpen }) => (
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
      {todos.length === 0 ? (
        <tr>
          <td colSpan={4} className="has-text-centered has-text-grey">
            No todos found
          </td>
        </tr>
      ) : (
        todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} isModalOpen={isModalOpen} />
        ))
      )}
    </tbody>
  </table>
);
