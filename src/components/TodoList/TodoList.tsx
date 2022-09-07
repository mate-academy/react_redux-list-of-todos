import classnames from 'classnames';
import React from 'react';
import { store } from '../../app/store';
import { Status } from '../../types/Status';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  const getVisibleTodos = () => {
    return todos
      .filter(todo => {
        return todo.title.toLowerCase().includes(filter.query.toLowerCase());
      })
      .filter(todo => {
        switch (filter.status) {
          case Status.ACTIVE:
            return !todo.completed;

          case Status.COMPLETED:
            return todo.completed;

          default:
            return true;
        }
      });
  };

  const visibleTodos = getVisibleTodos();

  return (
    <>
      {visibleTodos.length === 0 ? (
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
            {getVisibleTodos().map(todo => (
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
                  <p className={todo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      store.dispatch(currentTodoActions.setTodo(todo.id));
                    }}
                  >
                    <span className="icon">
                      <i className={classnames('far', {
                        'fa-eye-slash': todo.id === currentTodo,
                        'fa-eye': todo.id !== currentTodo,
                      })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
            {/* {
            // #region
          }
          <tr data-cy="todo">
            <td className="is-vcentered">1</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">delectus aut autem</p>
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
          </tr>
          {
            // #endregion
          } */}
          </tbody>
        </table>
      )}

    </>
  );
};
