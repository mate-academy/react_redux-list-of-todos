/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const activeTodo = useAppSelector(state => state.currentTodo);
  const filterBy = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const selectTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.setTodo(todo));
  };

  useEffect(() => {
    const result = todos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
      .filter(todo => {
        if (filterBy === 'all') return true;
        if (filterBy === 'completed') return todo.completed;
        if (filterBy === 'active') return !todo.completed;
        return true;
      });

    setFilteredTodos(result);
  }, [filterBy, query]);

  return (
    <>
      {filteredTodos.length === 0 ? (
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
            {filteredTodos.map(todo => (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': activeTodo?.id === todo.id,
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
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => selectTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': activeTodo?.id !== todo.id,
                          'fa-eye-slash': activeTodo?.id === todo.id,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
