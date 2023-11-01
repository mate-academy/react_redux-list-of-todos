/* eslint-disable max-len */
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>();

  const dispatch = useDispatch();
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filterTodos = () => {
    return todos.filter((todo) => {
      const filterQuery = todo.title.toLowerCase()
        .includes(filter.query.toLowerCase());

      switch (filter.status) {
        case Status.ACTIVE:
          return !todo.completed && filterQuery;
        case Status.COMPLETED:
          return todo.completed && filterQuery;
        default:
          return filterQuery;
      }
    });
  };

  const handlerTodoSelected = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  useEffect(() => {
    setFilteredTodos(filterTodos());
  }, [filter]);

  return (
    <>
      {filteredTodos && filteredTodos.length ? (
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
            {filteredTodos.map((todo) => (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': currentTodo?.id === todo.id,
                })}
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
                  <p className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
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
                    onClick={() => handlerTodoSelected(todo)}
                  >
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye': todo.id !== currentTodo?.id,
                        'fa-eye-slash': todo.id === currentTodo?.id,
                      })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
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
