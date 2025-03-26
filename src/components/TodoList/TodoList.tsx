import React, { memo, useCallback, useMemo } from 'react';
import cn from 'classnames';

import { getUserFromService } from '../../features/user';
import { setSelectedTodo } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { filterTodos } from '../../utils/filterTodos';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = memo(function TodoListComponent() {
  const dispatch = useAppDispatch();

  const { query, status, todos, selectedTodo } = useAppSelector(state => ({
    ...state.filterReducer,
    ...state.todosReducer,
    selectedTodo: state.todoReducer,
  }));

  const filteredTodos = useMemo(
    () => filterTodos(todos, status, query),
    [query, status, todos],
  );

  const choseTodo = useCallback(
    (todo: Todo) => {
      getUserFromService(dispatch, todo.userId);
      dispatch(setSelectedTodo(todo));
    },
    [dispatch],
  );

  return !!filteredTodos.length ? (
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
        {filteredTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
          >
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
                className={cn({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => choseTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye-slash': selectedTodo?.id === todo.id,
                      'fa-eye': selectedTodo?.id !== todo.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="notification is-warning">
      There are no todos matching current filter criteria
    </p>
  );
});
