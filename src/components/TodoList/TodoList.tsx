/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const todosToDisplay: Todo[] = todos
    .filter((todo) => {
      switch (filter.status) {
        case Status.All:
          return todo;

        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return todo;
      }
    })
    .filter((todo) => {
      const mathedTodod = todo.title.toLocaleLowerCase()
        .includes(filter.query.toLocaleLowerCase());

      return mathedTodod;
    });

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
          {todosToDisplay.map((todo: Todo) => {
            const selectedTodo = todo.id === currentTodo?.id;

            return (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {!todo.completed || (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  {/* <p className="has-text-danger">{todo.title}</p> */}
                  <p className={classNames(
                    {
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    },
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
                    onClick={() => {
                      dispatch(currentTodoActions.setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye': !selectedTodo,
                        'fa-eye-slash': selectedTodo,
                      })}
                      />
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
