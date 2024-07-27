/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { Status } from '../../types/Status';

type Props = {
  todosLoadErr: boolean;
};

export const TodoList: React.FC<Props> = ({ todosLoadErr }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todosSlice);
  const selectedTodo = useAppSelector(state => state.currentTodoSlice)

  const handleSelectedTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
  };

  const filteredTodos = () => {
    return todos.filter(todo => {
      const status = useAppSelector(state => state.filterSlice.status);
      const query = useAppSelector(status => status.filterSlice.query);
      const match = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (status) {
        case Status.COMPLETED:
          return match && todo.completed;
        case Status.ACTIVE:
          return match && !todo.completed;
        default:
          return match;
      }
    });
  };

  const visibleTodos = filteredTodos();

  return (
    <>
      {!visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!todosLoadErr && !!visibleTodos.length && (
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
            {visibleTodos.map(todo => {
              return (
                <tr key={todo.title} data-cy="todo">
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
                        'has-text-success': todo.completed,
                        'has-text-danger': !todo.completed,
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
                    >
                      <span className="icon">
                        <i
                          onClick={() => handleSelectedTodo(todo)}
                          className={`far ${selectedTodo === todo ? 'fa-eye-slash' : 'fa-eye'}`}
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
