/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { setCurrentTodo } from '../../features/currentTodo';

function filterTodos(
  todos: Todo[],
  { query, status }: { query: string; status: Status },
): Todo[] {
  return todos
    .filter(todo => {
      if (status === 'completed') return todo.completed;
      if (status === 'active') return !todo.completed;
      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
}

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  let preparedTodos;

  if (query || status !== 'all') {
    preparedTodos = filterTodos(todos, { query, status });
  } else {
    preparedTodos = [...todos];
  }

  const handleSelectTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  // const preparedTodos = filterTodos(todos, { query, status });

  return (
    <>
      {preparedTodos.length === 0 && query ? (
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
            {preparedTodos.map(todo => {
              return (
                <tr data-cy="todo" key={todo.id}>
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check"></i>
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
                      onClick={() => handleSelectTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={`far ${currentTodo ? 'fa-eye-slash' : 'fa-eye'}`}
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
