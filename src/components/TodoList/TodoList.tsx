/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { selectVisibleTodos } from '../../selectors/visibleTodosSelector';
import { setCurrentTodo } from '../../features/currentTodo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectVisibleTodos);
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);
  const status = useSelector((state: RootState) => state.todos.status); 

  const handleSelect = (todo: typeof selectedTodo) => {
    if (selectedTodo?.id === todo.id) {
      dispatch(setCurrentTodo(null));
    } else {
      dispatch(setCurrentTodo(todo));
    }
  };

  if (status === 'loading') {
    return <Loader />
  }

  if (todos.length === 0) {
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
          <th></th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
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
                      todo.id === selectedTodo?.id
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
  );
};

TodoList.displayName = 'TodoList';
