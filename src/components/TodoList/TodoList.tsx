// /* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import * as currentTodoActions from '../../features/currentTodo';

interface FilterOptions {
  query: string;
  status: string;
}

interface Options {
  todos: Todo[];
  filter: FilterOptions;
}

const getVisibleTodos = (options: Options) => {
  const {
    todos,
    filter: { query, status },
  } = options;
  let visibleTodos = [...todos];

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (status !== 'all') {
    visibleTodos = visibleTodos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });
  }

  return visibleTodos;
};

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const visibleTodos = getVisibleTodos({ todos, filter });

  const handleChoseTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setCurrentTodo(todo));
  };

  return (
    <>
      {!visibleTodos.length ? (
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
            {visibleTodos.map(todo => {
              return (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={cn({
                    'has-background-info-light': currentTodo?.id === todo.id,
                  })}
                >
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
                      className={cn('', {
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
                      onClick={() => handleChoseTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye-slash': currentTodo?.id === todo.id,
                            'fa-eye': currentTodo?.id !== todo.id,
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
      )}
    </>
  );
};
