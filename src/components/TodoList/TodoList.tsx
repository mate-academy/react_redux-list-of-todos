/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import cn from 'classnames';
import { setTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (status === 'active') {
        return !todo.completed === true;
      } else if (status === 'completed') {
        return todo.completed;
      } else {
        return true;
      }
    });
  }, [status, todos]);

  const filteredQueryTodos = useMemo(() => {
    return filteredTodos.filter(todo =>
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }, [filteredTodos, query]);

  console.log(filteredQueryTodos);

  if (filteredQueryTodos.length === 0) {
    return (
      <>
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      </>
    );
  }

  return (
    <>
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
          {filteredQueryTodos.map(todo => {
            return (
              <>
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={cn(currentTodo?.id === todo.id, {
                    ['has-background-info-light']: currentTodo?.id === todo.id,
                  })}
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
                      className={cn(
                        todo.completed ? 'has-text-success' : 'has-text-danger',
                      )}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(setTodo(todo))}
                    >
                      <span className="icon">
                        {currentTodo?.id === todo.id ? (
                          <i className="far fa-eye-slash" />
                        ) : (
                          <i className="far fa-eye" />
                        )}
                      </span>
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
