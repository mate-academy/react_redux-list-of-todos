/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { StatusType } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const status = useSelector((state: RootState) => state.filter.status);
  const query = useSelector((state: RootState) => state.filter.query);

  const dispatch = useDispatch();

  const filteredTodos = todos
    .filter(el => {
      switch (status) {
        case StatusType.Completed:
          return el.completed;
        case StatusType.Active:
          return !el.completed;
        default:
          return el;
      }
    })
    .filter(el => el.title.toLowerCase().includes(query.toLocaleLowerCase()));

  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);

  const handleSetCurrentTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <>
      {filteredTodos.length === 0 ? (
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
            {filteredTodos.map(todo => (
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
                    onClick={() => handleSetCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          currentTodo?.id === todo.id
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
