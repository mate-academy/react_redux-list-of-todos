/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const selectTodoHandler = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <>
      {/* <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p> */}

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
          {todos.map(todo => (
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
                    !todo.completed ? 'has-text-danger' : 'has-text-success'
                  }
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button" onClick={() => selectTodoHandler(todo)}>
                  <span className="icon">
                    <i className={classNames('far', {
                        'fa-eye-slash': todo.id === currentTodo?.id,
                        'fa-eye': todo.id !== currentTodo?.id,
                      })} />
                  </span>
                </button>
              </td>
            </tr>
          ))}

          {/* <tr data-cy="todo">
            <td className="is-vcentered">2</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">
                quis ut nam facilis et officia qui
              </p>
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
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
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
              <p className="has-text-danger">
                laboriosam mollitia et enim quasi adipisci quia provident illum
              </p>
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
              <p className="has-text-danger">
                qui ullam ratione quibusdam voluptatem quia omnis
              </p>
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
              <p className="has-text-danger">
                illo expedita consequatur quia in
              </p>
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
              <p className="has-text-success">
                illo est ratione doloremque quia maiores aut
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td> */}
          {/* </tr> */}
        </tbody>
      </table>
    </>
  );
};

