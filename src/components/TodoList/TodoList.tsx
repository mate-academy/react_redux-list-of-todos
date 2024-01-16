/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { actions as actionsTodos } from '../../features/todos';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const isSelected = (todo: Todo) => selectedTodo?.id === todo.id;

  useEffect(() => {
    getTodos()
      .then((todosArr: Todo[]) => dispatch(actionsTodos.setTodos(todosArr)));
  }, [dispatch]);

  const filteredTodo = todos.filter(todo => {
    if (status === 'active') {
      return !todo.completed;
    }

    if (status === 'completed') {
      return todo.completed;
    }

    return todo;
  }).filter(todo => todo
    .title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      {!filteredTodo.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!filteredTodo.length && (
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
            {
              filteredTodo
                .map(todo => {
                  const { id, title, completed } = todo;

                  return (
                    <tr
                      key={id}
                      data-cy="todo"
                      className={classNames({
                        'has-background-info-light':
                          isSelected(todo),
                      })}
                    >
                      <td className="is-vcentered">{todo.id}</td>
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
                        <p
                          className={classNames({
                            'has-text-success': todo.completed,
                            'has-text-danger': !todo.completed,
                          })}
                        >
                          {title}
                        </p>
                      </td>
                      <td className="has-text-right is-vcentered">
                        <button
                          onClick={() => dispatch(
                            currentTodoActions.setTodo(todo),
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
                })
            }
          </tbody>
        </table>
      )}
    </>
  );
};
