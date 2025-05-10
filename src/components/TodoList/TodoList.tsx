import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { useFilteredTodos } from '../../hooks/useFilteredTodos';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const preparedTodos = useFilteredTodos();

  const handleCurrentTodoChange = (todo: Todo | null) => {
    dispatch(setCurrentTodo(todo));
  };

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
        {preparedTodos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': currentTodo?.id === id,
              })}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleCurrentTodoChange(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye-slash': currentTodo?.id === id,
                        'fa-eye': currentTodo?.id !== id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
