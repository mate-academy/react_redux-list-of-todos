import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, selectedTodo }) => {
  const dispatch = useDispatch();

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
          <>
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames(
                { 'has-background-info-light': selectedTodo?.id === todo.id },
              )}
            >
              <td className="is-vcentered">{todo.userId}</td>
              {todo.completed
                ? (
                  <td className="is-vcentered">
                    <i className="fas fa-check" />
                  </td>
                )
                : (
                  <td className="is-vcentered" />
                )}
              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  { 'has-text-danger': !todo.completed },
                  { 'has-text-success': todo.completed },
                )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(actions.setTodo(todo))}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
