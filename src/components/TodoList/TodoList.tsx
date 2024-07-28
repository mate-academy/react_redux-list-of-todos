/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { setCurrentTodo, setCurrentUser } from '../../features/currentTodo';
import { getUser } from '../../api';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo.todo);

  const getFilteredTodos = (todoStatus: Status, todoQuery = '') => {
    let filteredTodos: Todo[] = [...todos];

    switch (todoStatus) {
      case Status.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case Status.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      case Status.All:
      default:
        filteredTodos = todos;
        break;
    }

    if (todoQuery) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(todoQuery.toLowerCase().trim()),
      );
    }

    return filteredTodos;
  };

  const filteredTodos = getFilteredTodos(status, query);

  const getCurrentTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));

    getUser(todo.userId).then(user => {
      dispatch(setCurrentUser(user));
    });
  };

  return (
    <>
      {!filteredTodos.length ? (
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
            {filteredTodos.map(todo => {
              const { id, completed, title } = todo;

              return (
                <tr data-cy="todo" key={id}>
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames({
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
                      onClick={() => getCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye-slash': currentTodo === todo,
                            'fa-eye': currentTodo !== todo,
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
      )}
    </>
  );
};
