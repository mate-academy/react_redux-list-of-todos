/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const list = useAppSelector(state => state.todos);
  const [todos, setTodos] = useState(list);
  const currentTodoId = useAppSelector(state => state.currentTodo?.id);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const setTodoActive = (todo: Todo) => dispatch(actions.setTodo(todo));

  const filterData = (data: Todo[], search: string, searchStatus: Status) => {
    if (search === '' && searchStatus === 'all') {
      return data;
    }

    return data.filter(el => {
      switch (searchStatus) {
        case 'active':
          return !el.completed;
        case 'completed':
          return el.completed;
        case 'all':
        default:
          return el;
      }
    }).filter(todo => (
      todo.title.toLowerCase()
        .includes(search.toLowerCase())
    ));
  };

  const isListEmpty = !todos.length && !!list.length;

  useEffect(() => {
    setTodos(filterData(list, query, status));
  }, [list, query, status]);

  return (
    <>
      {isListEmpty && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!todos.length && (
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
            {todos.map((todo) => {
              const {
                id,
                title,
                completed,
              } = todo;

              return (
                <tr
                  data-cy="todo"
                  key={id}
                  className={classNames({ 'has-background-info-light': currentTodoId === id })}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={completed ? 'has-text-success' : 'has-text-danger'}>{title}</p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => setTodoActive(todo)}
                    >
                      <span className="icon">
                        {
                          currentTodoId !== id
                            ? <i className="far fa-eye" />
                            : <i className="far fa-eye-slash" />
                        }
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
