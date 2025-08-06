import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { todosSlice } from '../../features/todos';
import { currentTodoSlice } from '../../features/currentTodo';
import { getTodos } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then(res => {
        dispatch(todosSlice.actions.fetchTodos(res));
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch todos', e);
      });
  }, [dispatch]);

  const addTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.addTodo(todo));
  };

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (status === 'active') {
          return !todo.completed;
        }

        if (status === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo => todo.title.toLowerCase().includes(query));
  }, [status, todos, query]);

  return (
    <>
      {todos.length === 0 ? (
        <Loader />
      ) : (
        <>
          {filteredTodos.length === 0 ? (
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
                    <td className="is-vcentered">
                      {todo.completed ? (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      ) : null}
                    </td>

                    <td className="is-vcentered is-expanded">
                      <p
                        className={classNames({
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
                        onClick={() => addTodo(todo)}
                      >
                        <span className="icon">
                          <i
                            className={classNames({
                              'far fa-eye': currentTodo?.id !== todo.id,
                              'far fa-eye-slash': currentTodo?.id === todo.id,
                            })}
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
      )}
    </>
  );
};
