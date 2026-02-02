import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selected: Todo | null;
}

export const TodoList: React.FC<Props> = ({ todos, onSelect, selected }) => (
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
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          onSelect={onSelect}
          selected={selected && todo.id === selected.id ? true : false}
        />
      ))}
    </tbody>
  </table>
);
