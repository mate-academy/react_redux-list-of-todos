/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actionsWithTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => {
    const todosToShow = state.todos;
    // const { query, status } = state.filter;

    // todosToShow = todosToShow.filter(todo => {
    //   switch (status) {
    //     case 'active':
    //       return !todo.completed;

    //     case 'completed':
    //       return todo.completed;

    //     case 'all':
    //     default:
    //       return todo;
    //   }
    // });

    return todosToShow;
  });
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

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
          {todos.map(todo => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={todo === currentTodo ? 'has-background-info-light' : ''}
            >
              <td className="is-vcentered">
                {todo.id}
              </td>
              <td className="is-vcentered">
                <span
                  className="icon"
                  data-cy="iconCompleted"
                >
                  <i className={todo.completed ? 'fas fa-check' : ''} />
                </span>
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={todo.completed
                    ? 'has-text-success'
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
                    dispatch(actionsWithTodo.set(todo));
                  }}
                >
                  <span className="icon">
                    <i className={currentTodo === todo
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'}
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
