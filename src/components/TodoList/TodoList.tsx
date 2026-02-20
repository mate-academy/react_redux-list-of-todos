import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../ToDoInfo/TodoInfo';

interface Props {
  todos: Todo[];
  onShow: (t: Todo) => void;
  modalOpen: boolean;
}

export const TodoList: React.FC<Props> = ({ todos, onShow, modalOpen }) => (
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
          onShow={onShow}
          modalOpen={modalOpen}
        />
      ))}
    </tbody>
  </table>
);
