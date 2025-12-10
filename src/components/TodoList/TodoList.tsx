import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { setCurrentTodo, setCurrentUser } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const { currentTodo } = useSelector((state: RootState) => state.currentTodo);

  const visiableTodos = todos
    .filter(todo => {
      if (status === 'active') {
        return todo.completed === false;
      } else if (status === 'completed') {
        return todo.completed === true;
      } else {
        return todo;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  if (visiableTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  const handleCurrentTodo = (todo: Todo) => {
    if (currentTodo?.id === todo.id) {
      dispatch(setCurrentTodo(null));
      dispatch(setCurrentUser(null));
    } else {
      dispatch(setCurrentTodo(todo));
      getUser(todo.userId).then(currentUser => {
        dispatch(setCurrentUser(currentUser));
      });
    }
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
          {visiableTodos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
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
                    todo.completed ? `has-text-success` : `has-text-danger`
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
                  onClick={() => handleCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={`far ${currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
