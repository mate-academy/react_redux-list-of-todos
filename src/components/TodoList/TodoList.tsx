import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodoSlice';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(s => s.todos.items);
  const currentTodo = useAppSelector(s => s.currentTodo.selected);

  return (
    <table>
      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={todo.completed ? 'has-background-info-light' : ''}
          >
            <td>{todo.title}</td>
            <td>
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  ✔
                </span>
              )}
              <i
                data-cy="selectButton"
                className={
                  currentTodo?.id === todo.id
                    ? 'fas fa-eye-slash'
                    : 'far fa-eye'
                }
                onClick={() =>
                  dispatch(
                    setCurrentTodo(currentTodo?.id === todo.id ? null : todo),
                  )
                }
                style={{ cursor: 'pointer' }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
