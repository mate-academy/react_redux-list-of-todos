/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';

import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { Loader } from '../Loader';

export const TodoList = (
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos().then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  const filter = useAppSelector((state) => state.filter);
  const query = useAppSelector((state) => state.filter.query);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const filteredTodos = todos.filter((todo) => {
    const isMatchingStatus
      = (filter.status === 'active' && !todo.completed)
      || (filter.status === 'completed' && todo.completed)
      || filter.status === 'all';

    if (isMatchingStatus && query.trim() !== '') {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    }

    return isMatchingStatus;
  });

  const handleViewButtonClick = (selectedTodo: Todo) => {
    dispatch(currentTodoActions.setTodo(selectedTodo));
  };

  return (
    <>
      {filteredTodos.length === 0 ? (
        <Loader />
      ) : (
        filteredTodos
          .some((todo) => todo.title
            .toLowerCase().includes(query.toLowerCase()))
          ? (
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
                  const isTodoClicked = todo.id === currentTodo?.id;

                  return (
                    <tr data-cy="todo">
                      <td className="is-vcentered">{todo.id}</td>
                      <td className="is-vcentered"> </td>

                      <td className="is-vcentered is-expanded">
                        <p className={classNames({
                          'has-text-danger': !todo.completed,
                          'has-text-success': todo.completed,
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
                          onClick={() => handleViewButtonClick(todo)}
                        >
                          <span className="icon">
                            {!isTodoClicked ? (
                              <i className="far fa-eye" />

                            ) : (
                              <i className="far fa-eye-slash" />

                            )}
                          </span>
                        </button>
                      </td>
                    </tr>

                  );
                })}

              </tbody>
            </table>

          ) : (
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          )

      )}

    </>
  );
};
