import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentAction } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { State } from '../../features/todos';

const getVisibleTodos = (
  todos: Todo[],
  filterType: Status,
  query: string,
): Todo[] => {
  let visibleTodos: Todo[] = [...todos];

  switch (filterType) {
    case Status.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case Status.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return visibleTodos.filter(
    todo => todo.title.toLowerCase().includes(
      query.toLowerCase(),
    ),
  );
};

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector<State>(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const visibleTodos = getVisibleTodos(todos, filter.status, filter.query);

  const handleOnSelect = (todo: Todo) => {
    dispatch(currentAction.setTodo(todo));
  };

  return (
    <>
      {todos.length === 0
        ? (
          <div className="notification is-danger">
            An error occured when loading data!
          </div>
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
              {visibleTodos.map((todo) => {
                const {
                  id,
                  title,
                  completed,
                } = todo;

                return (
                  <tr
                    data-cy="todo"
                    key={id}
                  >
                    <td className="is-vcentered">
                      {id}
                    </td>

                    <td className="is-vcentered">
                      {completed && (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      )}
                    </td>

                    <td className="is-vcentered is-expanded">
                      <p className={classNames(
                        {
                          'has-text-success': completed,
                          'has-text-danger': !completed,
                        },
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
                        onClick={() => handleOnSelect(todo)}
                      >
                        <span className="icon">
                          <i className={classNames('far', {
                            'fa-eye': !currentTodo,
                            'fa-eye-slash': currentTodo,
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
        )}
    </>
  );
};