/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { currentTodoActions } from '../../features/currentTodo';
import { FilterState } from '../../features/filter';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const currTodos = useSelector((state: RootState) => state.todos);
  const currentFilter: FilterState = useSelector((state: RootState) => state.filter);
  const currTodo = useSelector((state: RootState) => state.currentTodo);

  const todosByStatus = useMemo(() => {
    if (currTodos) {
      switch (currentFilter.status) {
        case 'active':
          return currTodos.filter(todo => !todo.completed);
        case 'completed':
          return currTodos.filter(todo => todo.completed);
        default:
          return currTodos;
      }
    }

    return [];
  }, [currTodos, currentFilter.status]);

  const todosPrepared = useMemo(() => (
    todosByStatus.filter(todo => todo.title.toLowerCase().includes(currentFilter.query))
  ), [todosByStatus, currentFilter.query]);

  const setSelectedTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    currTodos && currTodos.length > 0
      ? (
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
            {todosPrepared.map(todo => (
              <tr
                data-cy="todo"
                className={currTodo && currTodo.id === todo.id
                  ? 'has-background-info-light'
                  : ''}
                key={todo.id}
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
                    className={`has-text-${todo.completed ? 'success' : 'danger'}`}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={`far fa-eye${currTodo && currTodo.id === todo.id
                          ? '-slash'
                          : ''}`}
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
      )
  );
};
