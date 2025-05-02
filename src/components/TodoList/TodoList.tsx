import React from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  searchQuery: string;
  status: string;
  setSelectedTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  searchQuery,
  status,
  setSelectedTodoId,
  selectedTodoId,
}) => {
  const filteredTodos = todos
    .filter(todo => {
      if (status === 'all') {
        return true;
      }

      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <>
      <p className="notification is-warning">
        {filteredTodos.length === 0
          ? 'There are no todos matching current filter criteria'
          : ''}
      </p>

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
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {selectedTodoId === todo.id ? (
                  <button
                    data-cy="hideButton"
                    className="button"
                    type="button"
                    onClick={() => setSelectedTodoId(null)}
                  >
                    <span className="icon">
                      <i className="fas fa-eye-slash" />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setSelectedTodoId(todo.id)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
