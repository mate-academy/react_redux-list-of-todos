import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { actions as actionsTodos } from '../../features/todos';
import { actions as actionsCurTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoList: React.FC<TodoListProps> = ({
  setIsLoading,
  isLoading,
}) => {
  const { currentTodo, todos, filter } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const { query, status } = filter;

  const getVisibleTodos = todos.filter(item => {
    if (status === 'completed') {
      return item.completed;
    } else if (status === 'active') {
      return !item.completed;
    } else {
      return true;
    }
  });

  const getDataTodos = async () => {
    try {
      setIsLoading(true);
      const response = await getTodos();

      dispatch(actionsTodos.setTodos(response));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataTodos();
  }, []);

  const handleSetTodo = (todo: Todo) => {
    dispatch(actionsCurTodo.setTodo(todo));
  };

  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
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
          {!isLoading &&
            getVisibleTodos
              .filter(
                item =>
                  (query &&
                    item.title.toLowerCase().includes(query.toLowerCase())) ||
                  !query,
              )
              .map(item => (
                <tr key={item.id} data-cy="todo">
                  <td className="is-vcentered">{item.id}</td>
                  <td className="is-vcentered">
                    {item.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check"></i>
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p
                      className={
                        item.completed ? 'has-text-success' : 'has-text-danger'
                      }
                    >
                      {item.title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                    >
                      <span
                        className="icon"
                        onClick={() => handleSetTodo(item)}
                      >
                        <i
                          className={`far ${currentTodo && currentTodo.id === item.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
