/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hook';
import { selectTodos } from '../../features/todos';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(selectTodos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleSelectTodo = (todo: Todo) => {
    dispatch(setTodo(todo));
  };

  const filterTodos = (
    todos: Todo[],
    query: string,
    status: Status,
  ): Todo[] => {
    return todos.filter(todo => {
      if (!query && status === Status.All) {
        return true;
      }

      switch (status) {
        case Status.Active:
          if (todo.completed) {
            return false;
          }

          break;
        case Status.Completed:
          if (!todo.completed) {
            return false;
          }

          break;
      }

      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  };

  const filteredTodos = filterTodos(todos, query, status);

  return (
    <>
      {/* <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p> */}

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
            <tr
              className={classNames({
                'has-background-info-light': currentTodo?.id === todo.id,
              })}
              data-cy="todo"
              key={todo.id}
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
                  className={classNames(
                    { 'has-text-danger': !todo.completed },
                    { 'has-text-success': todo.completed },
                  )}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => handleSelectTodo(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i
                      className={classNames('fa', {
                        'fa-eye-slash': currentTodo?.id === todo.id,
                        'fa-eye': currentTodo?.id !== todo.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
