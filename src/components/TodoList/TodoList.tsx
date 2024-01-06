/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FilterState } from '../../features/filter';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

const prepareTodos = (todos: Todo[], filter: FilterState) => {
  let todosCopy = [...todos];

  if (filter.query) {
    todosCopy = todosCopy.filter(
      ({ title }) => title.toLowerCase().includes(filter.query.toLowerCase()),
    );
  }

  switch (filter.status) {
    case 'active':
      return todosCopy.filter(({ completed }) => !completed);

    case 'completed':
      return todosCopy.filter(({ completed }) => completed);

    default:
      return todosCopy;
  }
};

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector((store) => store.filter);

  const preparedTodos = useMemo(() => {
    return prepareTodos(todos, filter);
  }, [filter, todos]);

  const handleSetCurrentTodo = (todo: Todo) => {
    dispatch(
      todo.id === currentTodo?.id
        ? currentTodoActions.removeTodo()
        : currentTodoActions.setTodo(todo),
    );
  };

  return (
    <>
      {!!todos.length && !preparedTodos.length
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
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
              {preparedTodos.map((todo) => (
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
                    <p className={classNames({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => handleSetCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i className={classNames('far', {
                          'fa-eye-slash': currentTodo?.id === todo.id,
                          'fa-eye': currentTodo?.id !== todo.id,
                        })}
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
