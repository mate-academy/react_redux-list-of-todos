/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api';
import { RootState } from '../../app/store';
import { actions as todosActions } from '../../features/todos';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const filter = useSelector<RootState, string>(state => state.filter.status);
  const query = useSelector<RootState, string>(state => state.filter.query);
  const todos = useSelector<RootState, Todo[]>(state => state.todos);

  console.log('TODOS', todos);

  const updateTodosState = () => {
    switch (filter) {
      case 'all':
        return dispatch(todosActions.filterAll(todosFromServer, query));

      case 'active':
        return dispatch(todosActions.filterActive(todosFromServer, query));

      case 'completed':
        return dispatch(todosActions.filterCompleted(todosFromServer, query));

      default: return dispatch(todosActions.filterAll(todosFromServer, query));
    }
  };

  const getTodosFromServer = async () => {
    setIsLoading(true);

    const todosDownload: Todo[] = await getTodos();

    try {
      setTodosFromServer(todosDownload);
      dispatch(todosActions.filterAll(todosDownload, ''));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    updateTodosState();
  }, [filter, query]);

  return (
    <>
      {isLoading && <Loader />}

      {(todosFromServer.length > 0 && !todos.length) && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {todosFromServer.length > 0 && todos.length > 0 && (
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
            {todos && todos.map(todo => {
              const {
                id,
                title,
                // userId
              } = todo;

              return (
                <tr data-cy="todo" key={id}>
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered"> </td>

                  <td className="is-vcentered is-expanded">
                    <p className="has-text-danger">{title}</p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* <tr data-cy="todo">
            <td className="is-vcentered">2</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">quis ut nam facilis et officia qui</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo" className="has-background-info-light">
            <td className="is-vcentered">3</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">fugiat veniam minus</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">4</td>
            <td className="is-vcentered"><span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span></td>
            <td className="is-vcentered is-expanded">
              <p className="has-text-success">et porro tempora</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">5</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">laboriosam mollitia et enim quasi adipisci quia provident illum</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">6</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">qui ullam ratione quibusdam voluptatem quia omnis</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">7</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">illo expedita consequatur quia in</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">8</td>

            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-success">quo adipisci enim quam ut ab</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">9</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">molestiae perspiciatis ipsa</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>

          <tr data-cy="todo">
            <td className="is-vcentered">10</td>

            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-success">illo est ratione doloremque quia maiores aut</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
            </tr> */}
          </tbody>
        </table>
      )}
    </>
  );
};
