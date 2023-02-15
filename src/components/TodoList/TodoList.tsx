import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { ErrorNote } from '../ErrorNote';

export const TodoList = React.memo(() => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const showModal = (todo: Todo) => dispatch(actions.setTodo(todo));

  const todosToShow = useMemo(() => {
    const newTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (status) {
      case 'active':
        return newTodos.filter(todo => !todo.completed);
      case 'completed':
        return newTodos.filter(todo => todo.completed);
      case 'all':
        return newTodos;

      default:
        return todos;
    }
  }, [query, status, todos]);

  return (
    <>
      {!todosToShow.length
        ? (
          <ErrorNote
            text="There are no todos matching current filter criteria"
          />
        )

        : (
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
              {todosToShow.map(todo => {
                const { title, id, completed } = todo;

                return (
                  <tr
                    data-cy="todo"
                    key={id}
                    className={classNames({
                      'has-background-info-light': currentTodo?.id === id,
                    })}
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
                      <p className={classNames({
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
                        onClick={() => showModal(todo)}
                      >
                        <span className="icon">
                          <i className={classNames(
                            'far',
                            {
                              'fa-eye': currentTodo?.id !== id,
                              'fa-eye-slash': currentTodo?.id === id,
                            },
                          )}
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
});
