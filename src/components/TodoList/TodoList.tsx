import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const [apliedQuery, setApliedQuery] = useState(query);

  const filterTodos = () => {
    let filteredTodos: Todo[] = [...todos];

    switch (status) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      case 'all':
        break;

      default: break;
    }

    if (query.trim() !== '') {
      filteredTodos = filteredTodos.filter(todo => (
        todo.title.toLowerCase().includes(query.toLowerCase())
      ));
    }

    return filteredTodos;
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setApliedQuery(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const filteredProducts = useMemo(() => (
    filterTodos()
  ), [todos, apliedQuery]);

  const handleTodoClick = (todo: Todo) => {
    return dispatch(currentTodActions.setTodo(todo));
  };

  return (
    <>
      {todos.length > 0 ? (
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
            {filteredProducts.map(todo => {
              return (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={classNames({
                    'has-background-info-light': currentTodo?.id === todo.id,
                  })}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span
                        className="icon"
                        data-cy="iconCompleted"
                      >
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames({
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
                      onClick={() => handleTodoClick(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': currentTodo?.id !== todo.id,
                            'fa-eye-slash': currentTodo?.id === todo.id,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

    </>
  );
};
