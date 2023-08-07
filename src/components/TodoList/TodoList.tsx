import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as curentTodoFeat } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos.filter(
    (todo: Todo) => {
      const todoTitle = todo.title.toLocaleLowerCase();

      return todoTitle.includes(filter.query.toLocaleLowerCase());
    },
  ));

  const isSelected = (id: number) => currentTodo?.id === id;

  const visibleTodos = useMemo(() => {
    switch (filter.status) {
      case FilterStatus.All:
        return todos.filter((todo: Todo) => todo);
      case FilterStatus.Active:
        return todos.filter((todo: Todo) => !todo.completed);
      case FilterStatus.Completed:
        return todos.filter((todo: Todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter.status]);

  return (
    <>
      {filter.query && !visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      <table className="table is-narrow is-fullwidth">
        { !!visibleTodos.length && (
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
        )}

        <tbody>
          {visibleTodos.map((todo: Todo) => {
            const { title, completed, id } = todo;

            return (
              <tr key={id} data-cy="todo">
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={
                    completed ? 'has-text-success' : 'has-text-danger'
                  }
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(curentTodoFeat.setTodo(todo))}
                  >
                    <span className="icon">
                      <i className={`far ${isSelected(id) ? 'fa-eye-slash' : 'fa-eye'}`} />
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
