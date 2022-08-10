import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[],
  resetTodoId: () => void,
  selectTodo: (userIdFromTodo: number) => Promise<void>,
  selectTodoId: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  resetTodoId,
  selectTodo,
  selectTodoId,
}) => {
  return (
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>

              <td className="is-vcentered">
                {todo.completed ? (
                  <span className="icon">
                    <i className="fas fa-check" data-cy="iconCompleted" />
                  </span>
                ) : (
                  <span className="icon">
                    &#10006;
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  {
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  },
                )}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                {selectTodoId === todo.id ? (
                  <button
                    onClick={() => {
                      selectTodo(0);
                    }}
                    data-cy="selectButton"
                    className="button is-link"
                    type="button"
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      selectTodo(todo.id);
                    }}
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectTodoId !== 0 && (
        <TodoModal
          todos={todos}
          resetTodoId={resetTodoId}
          selectTodoId={selectTodoId}
        />
      )}
    </>
  );
};
