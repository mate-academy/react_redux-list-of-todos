/* eslint-disable max-len */
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actionTodos } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: FC = () => {
  const filtredTodos = useAppSelector(store => store.filter);
  const selectedTodo = useAppSelector(store => store.currentTodo);
  const dispatchSelectedTodo = useAppDispatch();
  const handlerSetTodo = (todo: Todo) => {
    dispatchSelectedTodo(actionTodos.setTodo(todo));
  };

  return (
    <>
      {!filtredTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {filtredTodos.map((todo) => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      `has-text-${todo.completed ? 'success' : 'danger'}`
                    }
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handlerSetTodo(todo)}
                  >
                    <span className="icon">
                      <i className={`far ${selectedTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`} />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
