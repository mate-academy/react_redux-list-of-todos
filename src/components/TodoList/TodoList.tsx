import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { actions as currentTodoActions } from '../../store/currentTodo';
import { Todo } from '../../type/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const filteredTodo = useAppSelector(state => state.items.filteredTodo);

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

      <tbody>
        {filteredTodo.map(todo => (
          <tr
            data-cy="todo"
            className={
              currentTodo?.id !== todo.id ? '' : 'has-background-info-light'
            }
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}

            {todo.completed ? (
              <td className="is-vcentered is-expanded">
                <p className="has-text-success">{todo.title}</p>
              </td>
            ) : (
              <td className="is-vcentered is-expanded">
                <p className="has-text-danger">{todo.title}</p>
              </td>
            )}

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(
                  currentTodoActions.setCurrentTodo(todo),
                )}
              >
                <span className="icon">
                  <i className={
                    currentTodo?.id !== todo.id
                      ? 'far fa-eye'
                      : 'far fa-eye-slash'
                  }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
