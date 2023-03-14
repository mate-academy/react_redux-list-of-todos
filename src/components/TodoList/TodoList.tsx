import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos.filter(
    (todo: Todo) => {
      return todo.title.includes(filter.query);
    },
  ));
  const isSelected = (id: number) => currentTodo?.id === id;
  const visibleTodos = () => {
    switch (filter.status) {
      case 'all':
        return todos.filter((todo: Todo) => todo);
      case 'active':
        return todos.filter((todo: Todo) => todo.completed);
      case 'completed':
        return todos.filter((todo: Todo) => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <>
      {
        !visibleTodos().length && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
      }
      <table className="table is-narrow is-fullwidth">
        {
          !!visibleTodos().length && (
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
          )
        }
        <tbody>
          {visibleTodos().map((todo: Todo) => {
            return (
              <tr
                key={todo.id}
                data-cy="todo"
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered"> </td>
                <td className="is-vcentered is-expanded">
                  <p className={
                    todo.completed
                      ? 'has-text-success' : 'has-text-danger'
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
                    onClick={() => {
                      dispatch(actions.setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i className={`far ${isSelected(todo.id) ? 'fa-eye-slash' : 'fa-eye'}`} />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
