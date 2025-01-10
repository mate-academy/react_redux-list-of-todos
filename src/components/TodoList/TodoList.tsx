/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { actions as currentTodoActions } from '../../features/currentTodo';
import classNames from 'classnames';

type Props = {
  errorMessage: boolean;
};

export const TodoList: React.FC<Props> = ({ errorMessage }) => {
  const dispatch = useDispatch();
  const todos = useSelector<RootState>(state => state.todos) as Todo[];
  const filter = useSelector<RootState, { query: string; status: Status }>(
    state => state.filter,
  );
  const currentTodo = useSelector<RootState>(state => state.currentTodo);
  const selectTodo = (todo: Todo) => dispatch(currentTodoActions.set(todo));
  const currentTodoList = todos.filter(todo => {
    if (todo.title.toLowerCase().includes(filter.query.toLowerCase())) {
      return (
        filter.status === 'all' ||
        (filter.status === 'active' && !todo.completed) ||
        (filter.status === 'completed' && todo.completed)
      );
    }
    return false;
  });

  return (
    <>
      {errorMessage ? (
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
            {currentTodoList.map((todo, index) => (
              <tr
                data-cy="todo"
                key={index}
                className={classNames({
                  'has-background-info-light': currentTodo === todo,
                })}
              >
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
                    className={classNames({
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
                    onClick={() => selectTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={`far fa-eye${currentTodo === todo ? '-slash' : ''}`}
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
