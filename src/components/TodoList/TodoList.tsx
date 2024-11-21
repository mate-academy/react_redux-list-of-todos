import { FC } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const openedTodo = useAppSelector(state => state.currentTodo);

  function handleOpenTodoModal(todo: Todo) {
    dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
  }

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
          {todos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': todo.id === openedTodo?.id,
              })}
            >
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
                  className={cn({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleOpenTodoModal(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': openedTodo?.id !== todo.id,
                        'fa-eye-slash': openedTodo?.id === todo.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
