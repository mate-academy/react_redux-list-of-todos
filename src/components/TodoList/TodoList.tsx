/* eslint-disable */
import React from 'react';
import { selectFilteredTodos } from '../../features/selectors';
import { Todo } from '../../types/Todo';
import { clearCurrentTodo, setCurrentTodo } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectFilteredTodos);
  const selectedTodo = useAppSelector(state => state.currentTodoSlice);

  const handleSelect = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      dispatch(clearCurrentTodo());
    } else {
      dispatch(setCurrentTodo(todo));
    }
  };

  return (
    <>
      {todos.length === 0 ? (
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
            {todos.map(todo => (
              <tr key={todo.id} data-cy="todo" className={todo.completed ? 'has-background-success-light' : ''}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
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
                    onClick={() => handleSelect(todo)}
                  >
                    <span className="icon">
                      {selectedTodo?.id === todo.id ? (
                        <i className="far fa-eye-slash" data-cy="iconHide" />
                      ) : (
                        <i className="far fa-eye" data-cy="iconShow" />
                      )}
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
