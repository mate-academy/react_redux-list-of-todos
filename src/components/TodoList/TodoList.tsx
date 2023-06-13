import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { filterTodosByQuery, filterTodosByStatus } from '../../helper';
import { State as FilterObject } from '../../features/filter';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const storeTodos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const filterTodos = (todos: Todo[], filterObject: FilterObject) => {
    const statusFilteredTodos = filterTodosByStatus(todos, filterObject.status);

    return filterTodosByQuery(statusFilteredTodos, filterObject.query);
  };

  const selectCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const filteredTodos = storeTodos ? filterTodos(storeTodos, filter) : [];

  return (
    <>
      {filteredTodos.length ? (
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
              const { id, completed, title } = todo;
              const isSelected = currentTodo?.id === id;

              return (
                <tr
                  key={id}
                  data-cy="todo"
                  className={cn({
                    'has-background-info-light': isSelected,
                  })}
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
                      className={cn({
                        'has-text-success': completed,
                        'has-text-danger': !completed,
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
                      onClick={() => selectCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn({
                            far: true,
                            'fa-eye-slash': isSelected,
                            'fa-eye': !isSelected,
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
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
