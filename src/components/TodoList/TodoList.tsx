import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTodo, clearCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { setTodoUser, setUserLoading } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.items);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo.todo);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesQuery =
      !normalizedQuery || todo.title.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });

  const handleSelect = async (todo: Todo) => {
    dispatch(selectTodo(todo));

    try {
      const user = await getUser(todo.userId);

      dispatch(setTodoUser(user));
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  const handleUnselect = () => {
    dispatch(clearCurrentTodo());
  };

  if (!visibleTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
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
          const isSelected = currentTodo?.id === todo.id;

          return (
            <tr
              data-cy="todo"
              key={todo.id}
              className={isSelected ? 'has-background-info-light' : ''}
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
                  onClick={() =>
                    isSelected ? handleUnselect() : handleSelect(todo)
                  }
                >
                  <span className="icon">
                    <i
                      className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
