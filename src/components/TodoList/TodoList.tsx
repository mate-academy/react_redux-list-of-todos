/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { action } from '../../features/selectedTodo';

interface ListTodosType {
  todos: Todo[];
}

export const TodoList: React.FC<ListTodosType> = ({ todos }) => {
  const selected = useAppSelector<Todo | null>(state => state.selected);

  const dispatch = useAppDispatch();

  const handleModalOpen = (currentTodo: Todo) => {
    dispatch(action.setSelected(currentTodo));
  };

  return (
    <>
      {todos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {todos.length > 0 && (
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
              <tr key={todo.id} data-cy="todo">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check"></i>
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
                    onClick={() => handleModalOpen(todo)}
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i
                        className={
                          todo.id === selected?.id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
                      />
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
