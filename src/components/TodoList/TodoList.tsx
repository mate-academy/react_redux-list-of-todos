import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const {
    query,
    status,
  } = useAppSelector<{ query: string, status: Status }>(state => state.filter);

  const selectTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const getFilteredTodos = () => {
    let filteredTodos = todos;

    switch (status) {
      case Status.active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case Status.completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      case Status.all:
      default:
        filteredTodos = todos;
    }

    return filteredTodos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  };

  const filteredTodos = useMemo(getFilteredTodos, [todos, status, query]);

  return (
    <>
      {!filteredTodos.length && query
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
              {filteredTodos.map(todo => (
                <tr data-cy="todo" key={todo.id}>
                  <td className="is-vcentered">{todo.id}</td>
                  {!todo.completed
                    ? <td className="is-vcentered" />
                    : (
                      <td className="is-vcentered">
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      </td>
                    )}
                  <td className="is-vcentered is-expanded">
                    <p
                      className={
                        classNames({
                          'has-text-danger': !todo.completed,
                          'has-text-success': todo.completed,
                        })
                      }
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
                        {
                          currentTodo?.id === todo.id
                            ? <i className="far fa-eye-slash" />
                            : <i className="far fa-eye" />
                        }
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
