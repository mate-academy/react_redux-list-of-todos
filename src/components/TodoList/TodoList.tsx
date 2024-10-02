import React from 'react';
import { Todo } from '../../types/Todo';
import classnames from 'classnames';
import { useAppSelector } from '../../utils/hooks';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { getFilteredTodos } from '../../utils/filter';

export const TodoList: React.FC = () => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  const selectedTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  const filteredTodos = getFilteredTodos(todos, filter);

  const dispatch = useDispatch();

  return (
    <>
      {!filteredTodos.length ? (
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
            {filteredTodos.map(todo => {
              const { completed, id, title } = todo;

              return (
                <tr
                  data-cy="todo"
                  className={classnames({
                    'has-background-info-light': selectedTodo,
                  })}
                  key={id}
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
                      className={classnames({
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
                      onClick={() => dispatch(setCurrentTodo(todo))}
                    >
                      <span className="icon">
                        <i
                          className={classnames('far', {
                            'fa-eye-slash': selectedTodo?.id === id,
                            'fa-eye': selectedTodo?.id !== id,
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
