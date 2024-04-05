/* eslint-disable */
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/todos';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getTodos } from '../../api';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector((state: RootState) => state.todos);

  const status = useSelector<RootState>(state => state.filter.status);
  const text = useSelector<RootState, string>(state => state.filter.text);
  const { id: currentId } =
    useSelector((state: RootState) => state.currentTodo) || {};

  const visibleTodos = useMemo(() => {
    let newTodos = [...todos];

    if (status === 'all') {
      newTodos = todos;
    }

    if (status === 'active') {
      newTodos = todos.filter(todo => !todo.completed);
    }

    if (status === 'completed') {
      newTodos = todos.filter(todo => todo.completed);
    }

    if (text) {
      newTodos = newTodos.filter(todo => todo.title.includes(text));
    }

    return newTodos;
  }, [status, text, todos]);

  const handliClick = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  useEffect(() => {
    if (visibleTodos) {
      // setLoader(false);
    }
  }, [visibleTodos]);

  useEffect(() => {
    getTodos().then((data: Todo[]) => dispatch(actions.setTodo(data)));
  }, []);

  return (
    <>
      {!visibleTodos.length && !!todos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        {!visibleTodos.length && !!todos.length && (
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
        )}

        <tbody>
          {visibleTodos.map(todo => {
            const { id, title, completed } = todo;

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
                      'has-text-danger': !completed,
                      'has-text-success': completed,
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
                  >
                    <span className="icon" onClick={() => handliClick(todo)}>
                      {currentId === todo.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
