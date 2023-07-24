import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const setTodo = (todo: Todo) => dispatch(
    currentTodoActions.setTodo(todo),
  );

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
        {todos.map(todo => {
          const {
            id,
            completed,
            title,
          } = todo;

          const isSelected = id === currentTodo?.id;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': isSelected,
              })}
              key={id}
            >
              <td className="is-vcentered">
                {id}
              </td>

              {completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered" />
                )}

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
                  onClick={() => setTodo(todo)}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye-slash': isSelected,
                      'fa-eye': !isSelected,
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
