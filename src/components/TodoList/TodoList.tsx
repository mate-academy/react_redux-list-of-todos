import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = props => {
  const { todos } = props;

  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

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
          const { id, completed, title } = todo;
          const isSelected = currentTodo && currentTodo.id === id;

          return (
            <tr
              data-cy="todo"
              className={cn({ 'has-background-info-light': isSelected })}
              key={id}
            >
              <td className="is-vcentered">{id}</td>

              <td className="is-vcentered">
                {completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : null}
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
                  onClick={() => {
                    if (currentTodo && currentTodo.id === todo.id) {
                      dispatch(setCurrentTodo(null));
                    } else {
                      dispatch(setCurrentTodo(todo));
                    }
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye-slash':
                          currentTodo && currentTodo.id === todo.id,
                        'fa-eye': !(currentTodo && currentTodo.id === todo.id),
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
