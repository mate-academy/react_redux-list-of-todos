/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  onTodoSelect: (todo: Todo) => void;
  onModalClose: () => void;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  onTodoSelect,
  onModalClose,
  selectedTodoId,
}) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  // const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleTodoSelect = (todo: Todo) => {
    if (selectedTodoId === todo.id) {
      onModalClose();
    } else {
      dispatch(setCurrentTodo(todo));
      onTodoSelect(todo);
    }
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    if (status === 'active' && todo.completed) return false;
    if (status === 'completed' && !todo.completed) return false;
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      {filteredTodos.length === 0 ? (
        <p className="notification is-warning" data-cy="noTodos">
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
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleTodoSelect(todo)}
                  >
                    <span className="icon">
                      {selectedTodoId === todo.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
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
