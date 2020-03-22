import React, { FC, useMemo } from 'react';
import { Todo } from '../Todo/Todo';

interface Props {
  typeOfSort: string;
  todos: PreparedTodo[];
  setSortType: (typeOfSort: string) => void;
}

// eslint-disable-next-line no-shadow
export const TodoListTemplate: FC<Props> = ({ todos, typeOfSort, setSortType }) => {
  const sortedTodo = useMemo(() => {
    switch (typeOfSort) {
      case 'title':
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));
      case 'completed':
        return [...todos]
          .sort((todoA, todoB) => (Number(todoB.completed) - Number(todoA.completed)));
      case 'user':
        return [...todos].sort((a, b) => a.user.name.localeCompare(b.user.name));
      default:
        return todos;
    }
  }, [todos, typeOfSort]);

  return (
    <>
      <button
        className="button"
        type="button"
        onClick={() => setSortType('title')}
      >
        sort by title
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          setSortType('completed');
        }}
      >
        sort by status
      </button>
      <button
        className="button"
        type="button"
        onClick={() => setSortType('user')}
      >
        by user name
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Task</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedTodo.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
    </>
  );
};
