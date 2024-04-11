/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { actions as currentTodoAction } from '../../features/currentTodo'
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const filtered = () => {
    switch (filter.status) {
      case 'all':
        return todos.filter((todo) => todo.title.toLowerCase().includes(filter.query));
      case 'active':
        return todos.filter((todo) => (
          !todo.completed
            && todo.title.toLowerCase().includes(filter.query)
        ));
      case 'completed':
        return todos.filter((todo) => (
          todo.completed
            && todo.title.toLowerCase().includes(filter.query)
        ));
      default:
        return todos;
    }
  };

  const handleTodoSet = (todo: Todo) => {
    dispatch(currentTodoAction.setTodo(todo))
  }

  return (
    <>
      {!filtered() ? (
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
          {filtered().map((todo) => {
            const  { id, title, completed } = todo;

            return(
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
                  className={cn(
                    {
                      "has-text-success": completed,
                      "has-text-danger": !completed
                    }
                  )}
                >
                  {title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleTodoSet(todo)}
                >
                  <span
                    className="icon"

                  >
                    <i
                      className={cn(
                        "far",
                        {
                          "fa-eye": currentTodo !== todo,
                          "fa-eye-slash": currentTodo === todo
                        }
                      )}
                  />
                  </span>
                </button>
              </td>
            </tr>
            )
            })}
        </tbody>
      </table>
      )}
    </>
  );
};
