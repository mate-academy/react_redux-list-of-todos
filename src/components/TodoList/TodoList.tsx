/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { TODO_ACTIONS } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';
import { CURRENT_TODOS_SELECTORS, TODOS_SELECTORS } from '../../app/selectors';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = React.memo((props) => {
  const { todos } = props;

  const error = useAppSelector(TODOS_SELECTORS.error);
  const currentTodo = useAppSelector(CURRENT_TODOS_SELECTORS.currentTodo);
  const dispatch = useDispatch();

  const handleSelectButton = (todo: Todo) => {
    dispatch(TODO_ACTIONS.setTodo(todo));
  };

  return (
    error !== null
      ? (
        <p>error</p>
      ) : (
        <>
          {todos.length === 0
            ? (
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
                  {todos.map(todo => {
                    const {
                      id,
                      title,
                      completed,
                    } = todo;

                    return (
                      <tr
                        data-cy="todo"
                        key={id}
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
                          <p className={classNames({
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
                            onClick={() => handleSelectButton(todo)}
                          >
                            <span className="icon">
                              {currentTodo
                                ? <i className="far fa-eye-slash" />
                                : <i className="far fa-eye" />}
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
        </>
      )
  );
});
