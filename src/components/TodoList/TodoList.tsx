/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

const filterByStatus = (todos: Todo[], status: Status) => {
  switch (status) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'all':
    default:
      return todos;
  }
};

const filterByQuery = (todos: Todo[], query: string) => {
  if (!query.trim()) {
    return todos;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return todos.filter(todo =>
    todo.title.toLowerCase().includes(normalizedQuery),
  );
};

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  console.log(todos.length);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = filterByQuery(filterByStatus(todos, status), query);

  if (filteredTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  const handleSelect = (todo: Todo) => {
    if (currentTodo && currentTodo.id === todo.id) {
      dispatch(setCurrentTodo(null));
      return;
    }

    dispatch(setCurrentTodo(todo));
  };

  return (
    <>
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
            const isSelected = currentTodo && currentTodo.id === todo.id;
            const isCompleted = todo.completed;

            return (
              <tr
                data-cy="todo"
                key={todo.id}
                className={isSelected ? 'has-background-info-light' : ''}
              >
                <td className="is-vcentered">{todo.id}</td>

                <td className="is-vcentered">
                  {isCompleted && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      isCompleted ? 'has-text-success' : 'has-text-danger'
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
                    onClick={() => handleSelect(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          isSelected ? 'far fa-eye-slash' : 'far fa-eye'
                        }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
