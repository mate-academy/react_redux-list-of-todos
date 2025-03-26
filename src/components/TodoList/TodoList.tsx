/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  filter: string;
  searchQuery: string;
  onTodoSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ filter, searchQuery, onTodoSelect }) => {
  const todos = useSelector((state: RootState) => state.todos);

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || (filter === 'active' && !todo.completed) || (filter === 'completed' && todo.completed);

    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

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

        {filteredTodos.length === 0 ? (
          <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
        ) : (
          <tbody>
          {filteredTodos.map((todo: Todo) => (
            <tr key={todo.id} data-cy="todo">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={todo.completed ? "has-text-success" : "has-text-danger"}>{todo.title}</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button" onClick={() => onTodoSelect(todo)}>
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
          ))}
        </tbody>
        )}
      </table>
    </>
  );
};
