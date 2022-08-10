import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onSetSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  onSettingModal: React.Dispatch<React.SetStateAction<boolean>>,
};

export const TodoList: React.FC<Props> = (
  { todos, onSetSelectedTodo, onSettingModal },
) => (
  <>
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
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
                ? <i className="fas fa-check-square has-text-success" />
                : <i className="fas fa-exclamation-triangle has-text-danger" />}
            </td>
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onSetSelectedTodo(todo);
                  onSettingModal(true);
                }}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>

  </>
);
