/* eslint-disable max-len */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    let newTodos = [...todos];

    if (filter.query) {
      newTodos = newTodos.filter(
        todo => todo.title.toLowerCase().includes(filter.query),
      );
    }

    switch (filter.status) {
      case 'active':
        return newTodos.filter(todo => !todo.completed);

      case 'completed':
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }, [filter]); // todos?

  const handleSelectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {
        !filteredTodos.length ? (
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
              {
                filteredTodos.map(todo => {
                  const {
                    id,
                    title,
                    completed,
                  } = todo;

                  const isCurrentTodo = id === currentTodo?.id;

                  return (
                    <tr
                      key={id}
                      data-cy="todo"
                      className={classNames({
                        'has-background-info-light': isCurrentTodo,
                      })}
                    >
                      <td className="is-vcentered">{id}</td>
                      <td className="is-vcentered">
                        {completed && (
                          <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
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
                          onClick={() => handleSelectTodo(todo)}
                        >
                          <span className="icon">
                            <i className={classNames('far', {
                              'fa-eye': !isCurrentTodo,
                              'fa-eye-slash': isCurrentTodo,
                            })}
                            />
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              }

              {/* <tr data-cy="todo">
                <td className="is-vcentered">2</td>
                <td className="is-vcentered"> </td>

                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">quis ut nam facilis et officia qui</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>

              <tr data-cy="todo" className="has-background-info-light">
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
              </tr>

              <tr data-cy="todo">
                <td className="is-vcentered">4</td>
                <td className="is-vcentered"><span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span></td>
                <td className="is-vcentered is-expanded">
                  <p className="has-text-success">et porro tempora</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>

              <tr data-cy="todo">
                <td className="is-vcentered">5</td>
                <td className="is-vcentered"> </td>

                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">laboriosam mollitia et enim quasi adipisci quia provident illum</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>

              <tr data-cy="todo">
                <td className="is-vcentered">6</td>
                <td className="is-vcentered"> </td>

                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">qui ullam ratione quibusdam voluptatem quia omnis</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>

              <tr data-cy="todo">
                <td className="is-vcentered">7</td>
                <td className="is-vcentered"> </td>

                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">illo expedita consequatur quia in</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>

              <tr data-cy="todo">
                <td className="is-vcentered">8</td>

                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>

                <td className="is-vcentered is-expanded">
                  <p className="has-text-success">quo adipisci enim quam ut ab</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>

              <tr data-cy="todo">
                <td className="is-vcentered">9</td>
                <td className="is-vcentered"> </td>

                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">molestiae perspiciatis ipsa</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>

              <tr data-cy="todo">
                <td className="is-vcentered">10</td>

                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>

                <td className="is-vcentered is-expanded">
                  <p className="has-text-success">illo est ratione doloremque quia maiores aut</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr> */}
            </tbody>
          </table>
        )
      }
    </>
  );
};
