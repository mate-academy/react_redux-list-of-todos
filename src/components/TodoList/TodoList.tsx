/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { actions as currTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

type Props = {
  isError: boolean;
};

export const TodoList: React.FC<Props> = ({ isError = false }) => {
  const dispatch = useDispatch();
  const todos = useSelector<RootState>(state => state.todos) as Todo[];
  const filter = useSelector<RootState, { query: string; status: Status }>(
    state => state.filter,
  );
  const currTodo = useSelector<RootState>(
    state => state.currTodo,
  ) as Todo | null;

  const selectCurrTodo = (todo: Todo) => dispatch(currTodoActions.set(todo));

  const currTodoList = todos.filter(todo => {
    if (todo.title.toLowerCase().includes(filter.query.toLowerCase())) {
      return (
        filter.status === 'all' ||
        (filter.status === 'active' && !todo.completed) ||
        (filter.status === 'completed' && todo.completed)
      );
    }
    return false;
  });

  console.log(todos);

  return (
    <>
      {isError ? (
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
            {currTodoList.map((todo, index) => (
              <tr
                data-cy="todo"
                key={index}
                className={classNames({
                  'has-background-info-light': currTodo === todo,
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
                    onClick={() => selectCurrTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={`far fa-eye${currTodo === todo ? '-slash' : ''}`}
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
