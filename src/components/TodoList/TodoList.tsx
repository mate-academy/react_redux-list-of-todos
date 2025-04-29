import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const selectedTodo = useAppSelector(state => state.currentTodo.value);
  const dispatch = useDispatch();

  const onOpen = (todo: Todo) => {
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={classNames({
              'has-background-info-light': selectedTodo?.id === todo.id,
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
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
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
                onClick={() => onOpen(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': selectedTodo?.id === todo.id,
                      'fa-eye': selectedTodo?.id !== todo.id,
                    })}
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
