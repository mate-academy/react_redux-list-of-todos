/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleClick = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const currentTodos = useMemo(() => {
    if (filter.query === '' && filter.status === Status.All) {
      return todos;
    }

    let newTodos = [...todos];

    if (filter.query) {
      newTodos = newTodos.filter(todo => todo.title.toLowerCase().includes(filter.query.toLowerCase()));
    }

    switch (filter.status) {
      case Status.All:
        return newTodos;

      case Status.Active:
        return newTodos.filter(todo => !todo.completed);

      case Status.Completed:
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }, [todos, filter]);

  return (
    <>
      {currentTodos.length === 0 ? (
        <p className="notification is-warning">
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
            {currentTodos.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                  ) : (' ')}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button" onClick={() => handleClick(todo)}>
                    <span className="icon">
                      <i
                        className={currentTodo?.id === todo.id ? 'far fa-eye-slash' : 'far fa-eye'}
                      />
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
