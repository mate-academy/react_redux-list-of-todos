/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  const [visibleItems, setVisibleItems] = useState(todos);

  useEffect(() => {
    function filterTodo() {
      let filteredTodos = todos;

      switch (status) {
        case 'active':
          filteredTodos = todos.filter(item => !item.completed);
          break;
        case 'completed':
          filteredTodos = todos.filter(item => item.completed);
          break;
      }

      if (query.trim()) {
        filteredTodos = filteredTodos.filter(item =>
          item.title.toLowerCase().includes(query.trim().toLowerCase()),
        );
      }

      setVisibleItems(filteredTodos);
    }

    filterTodo();
  }, [status, query]);

  const handleTodoSelect = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <>
      {!visibleItems.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {visibleItems.length > 0 && (
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
            {visibleItems.map(todo => (
              <tr data-cy="todo" key={todo.id}>
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
                    onClick={() => handleTodoSelect(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'far ',
                          { 'fa-eye': currentTodo?.id !== todo.id },
                          { 'fa-eye-slash': currentTodo?.id === todo.id },
                        )}
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
