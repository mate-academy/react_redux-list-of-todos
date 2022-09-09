import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setSelectedTodo } from '../../features/selectTodo';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((state: RootState) => state.filter.filter);
  const quary = useSelector((state: RootState) => state.quary.quary);
  const selectedTodo = useSelector((state: RootState) => (
    todos.find(todo => todo.id === state.selectTodo.todo)
  ));
  const dispatch = useDispatch();
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return todo;
    }
  });

  const preparedTodos = filteredTodos
    .filter(todo => todo.title.includes(quary));

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
        {preparedTodos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={(todo === selectedTodo)
              ? 'has-background-info-light'
              : ''}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
              && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={todo.completed ? 'has-text-success'
                  : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  dispatch(setSelectedTodo(todo.id));
                }}
              >
                <span className="icon">
                  {(todo === selectedTodo)
                    ? (<i className="far fa-eye-slash" />)
                    : (<i className="far fa-eye" />)}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
