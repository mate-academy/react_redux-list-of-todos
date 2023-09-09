/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from '../../api';
import { actions as todosActions } from '../../features/todos';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as selectedTodoActions } from '../../features/currentTodo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector((state) => state.currentTodo);
  const filterStatus = useAppSelector((state) => state.filter.status);
  const todos = useAppSelector((state) => state.todos);
  const [isLoading, setIsLoading] = useState(false);
  const query = useAppSelector((state) => state.filter.query);
  const [isError, setIsError] = useState(false);
  const setSelectedTodo = (todo: Todo) => {
    dispatch(selectedTodoActions.setTodo(todo));
  };

  const filteredTodos = useMemo(() => {
    const newTodos = query
      ? todos.filter((todo) => todo.title.toLowerCase().includes(query))
      : [...todos];

    switch (filterStatus) {
      case 'active':
        return newTodos.filter((todo) => todo.completed === false);

      case 'completed':
        return newTodos.filter((todo) => todo.completed === true);

      default:
        return newTodos;
    }
  }, [query, todos, filterStatus]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((res) => {
        dispatch(todosActions.addTodos(res));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {!isLoading && !isError && filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      {isLoading && !isError && <Loader />}
      {!isLoading && !isError && filteredTodos.length > 0 && (
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
            {filteredTodos.map((todo) => {
              return (
                <tr data-cy="todo" key={todo.id}>
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
                      className={
                        todo.completed ? 'has-text-success' : 'has-text-danger'
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
                      onClick={() => setSelectedTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={
                            todo.id === selectedTodo?.id
                              ? 'far fa-eye-slash'
                              : 'far fa-eye'
                          }
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
