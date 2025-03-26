/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';
import { getUser } from '../../api';

type Props ={
  onAddUser: () => void;
}

export const TodoList: React.FC<Props> = ({onAddUser}) => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filterTodo = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const [todosBefore, setTodosBefore] = useState<Todo[]>([]);
  const [loadingUser, setLoadingUser] = useState(false);

  async function handleSelect(todo: Todo) {
    onAddUser();

    try {
      const user = await getUser(todo.userId);
      const selectedTodo = { ...todo, user };

      if (currentTodo?.id !== todo.id) {
        dispatch(currentTodoSlice.actions.setCurrentTodo(selectedTodo as Todo));
      } else {
        dispatch(currentTodoSlice.actions.clearCurrentTodo());
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      onAddUser();
    }
  }

  function filteredTodos() {
    let copyTodos = [...todos];

    if (filterTodo.query) {
      copyTodos = copyTodos.filter(todo =>
        todo.title.toLowerCase().includes(filterTodo.query.toLowerCase()),
      );
    }

    switch (filterTodo.status) {
      case 'active':
        return copyTodos.filter(todo => !todo.completed);
      case 'completed':
        return copyTodos.filter(todo => todo.completed);
      default:
        return copyTodos;
    }
  }

  useEffect(() => {
    setTodosBefore(filteredTodos());
  }, [filterTodo]);

  return (
    <>
      {todosBefore.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {todosBefore?.map(todo => (
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
                  onClick={() => handleSelect(todo)}
                >
                  <span className="icon">
                    <i
                      className={
                        todo.id === currentTodo?.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
