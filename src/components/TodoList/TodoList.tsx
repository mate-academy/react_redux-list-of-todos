/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState, MouseEvent,
} from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { State, actions as curentTodoActions } from '../../features/currentTodo';
import { Filter } from '../../features/filter';

export const TodoList: React.FC = () => {
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);

  const todos: Todo[] = useAppSelector(state => state.todos);
  const filter: Filter = useAppSelector(state => state.filter);
  const curentTodo: State = useAppSelector(state => state.currentTodo);
  const { query, status } = filter;

  const dispatch = useAppDispatch();
  const set = useCallback((selectedTodo: Todo) => (
    dispatch(curentTodoActions.setTodo(selectedTodo))
  ), []);

  const setHandler = (event: MouseEvent<HTMLButtonElement>, todo: Todo) => {
    event.preventDefault();
    set(todo);
  };

  const isNoMathches = useMemo(() => Boolean(filtredTodos.length === 0 && query),
    [filter, filtredTodos]);

  useEffect(() => {
    const filtredByQuery = todos.filter(todo => todo.title.includes(query));

    switch (status) {
      case 'all':
        setFiltredTodos(filtredByQuery);
        break;

      case 'active': {
        const active = filtredByQuery.filter((todo) => !todo.completed);

        setFiltredTodos(active);
      }

        break;

      case 'completed': {
        const completed = filtredByQuery.filter((todo) => todo.completed);

        setFiltredTodos(completed);
      }

        break;

      default:
        setFiltredTodos(filtredByQuery);
        break;
    }
  }, [filter, query, status, todos]);

  useEffect(() => {
    setFiltredTodos(todos);
  }, [todos]);

  return (
    <>
      {isNoMathches
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
              {filtredTodos.map(({
                id, completed, title, userId,
              }: Todo) => {
                return (
                  <tr
                    data-cy="todo"
                    className={`${curentTodo?.id === id
                      ? 'has-background-info-light'
                      : ''
                    }`}
                    key={id}
                  >
                    <td className="is-vcentered">{id}</td>
                    <td className="is-vcentered">
                      {completed
                        && (
                          <span className="icon" data-cy="iconCompleted">
                            <i className="fas fa-check" />
                          </span>
                        )}
                    </td>

                    <td className="is-vcentered is-expanded">
                      <p className={`${completed
                        ? 'has-text-success'
                        : 'has-text-danger'}`}
                      >
                        {title}
                      </p>
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={(event) => setHandler(event, {
                          id, completed, title, userId,
                        })}
                      >
                        <span className="icon">
                          <i className={
                            `far ${curentTodo?.id === id
                              ? 'fa-eye-slash'
                              : 'fa-eye'}`
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
