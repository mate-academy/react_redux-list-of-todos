/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { action } from '../../features/currentTodo';
import { action as todosAction } from '../../features/todos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const isSelected = (todo: Todo) => selectedTodo?.id === todo.id;

  const filteredTodos = todos.filter(todo => {
    if (status === 'active') {
      return !todo.completed;
    }

    if (status === 'completed') {
      return todo.completed;
    }

    return todo;
  }).filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    dispatch(todosAction.setTodos(filteredTodos));
  }, []);

  return (
    <>

      {todos.length ? (
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
            {filteredTodos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr
                  data-cy="todo"
                  key={id}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {
                      completed && (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      )
                    }
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
                      onClick={() => dispatch(
                        action.setTodo(todo),
                      )}
                      data-cy="selectButton"
                      className="button"
                      type="button"
                    >

                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !isSelected(todo),
                            'fa-eye-slash': isSelected(todo),
                          })}
                        />
                      </span>

                    </button>
                  </td>
                </tr>
              );
            })}
            {/* <tr data-cy="todo" className="has-background-info-light">
              <td className="is-vcentered">3</td>
              <td className="is-vcentered"> </td>

              <td className="is-vcentered is-expanded">
                <p className="has-text-danger">fugiat veniam minus</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              </td>
            </tr> */}

          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
