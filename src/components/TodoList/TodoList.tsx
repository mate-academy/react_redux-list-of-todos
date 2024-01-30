import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filters';
import { Status } from '../../types/Status';

const getFilteredTodos = (todos: Todo[], filter: Filter) => {
  const { status, query } = filter;

  const trimmedQuery = query.toLowerCase().trim();

  if (status === Status.Active) {
    return todos.filter(todo => todo.title.toLowerCase().includes(trimmedQuery)
      && !todo.completed);
  }

  if (status === Status.Completed) {
    return todos.filter(todo => todo.title.toLowerCase().includes(trimmedQuery)
      && todo.completed);
  }

  return todos.filter(todo => todo.title.toLowerCase().includes(trimmedQuery));
};

export const TodoList: FC = () => {
  const { filter, currentTodo } = useAppSelector(state => state);
  const { todos } = useAppSelector(state => state.todos);
  const dispatch = useDispatch();
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setFilteredTodos(getFilteredTodos(todos, filter));
  }, [filter, todos]);

  return (
    <>
      {!filteredTodos.length
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
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
                  {' '}
                </th>
                <th>Title</th>
                <th>{' '}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map(todo => {
                const { id, title, completed } = todo;

                return (
                  <tr
                    data-cy="todo"
                    key={id}
                    className={cn(
                      { 'has-background-info-light': id === currentTodo?.id },
                    )}
                  >
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
                            'has-text-danger': !completed,
                            'has-text-success': completed,
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
                        onClick={() => dispatch(
                          currentTodoActions.setTodo(todo),
                        )}
                      >
                        <span className="icon">
                          <i
                            className={cn(
                              'far',
                              {
                                'fa-eye': id !== currentTodo?.id,
                                'fa-eye-slash': id === currentTodo?.id,
                              },
                            )}
                          />
                        </span>
                        {' '}
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
