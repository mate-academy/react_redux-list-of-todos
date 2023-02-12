/* eslint-disable max-len */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  isError: boolean
};

export const TodoList: React.FC<Props> = ({ isError }) => {
  const filter = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo?.id);
  const loadedTodos = useAppSelector(state => state.todos.todos)
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  const dispatch = useDispatch();

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return loadedTodos.filter(todo => !todo.completed);
      case 'completed':
        return loadedTodos.filter(todo => todo.completed);
      default:
        return loadedTodos;
    }
  }, [filter, query, loadedTodos]);

  const { setTodo } = actions;

  const todosAreEmpty = !filteredTodos.length && !isError;

  return (
    <>
      {todosAreEmpty && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      {isError && (
        <p className="notification is-danger">
          Error occured while todos are loaded!
        </p>
      )}

      {filteredTodos.length > 0 && (
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
            {filteredTodos.map(todo => (
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
                  <p className={cn(
                    { 'has-text-danger': !todo.completed },
                    { 'has-text-success': todo.completed },
                  )}
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
                      dispatch(setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i className={cn(
                        { 'far fa-eye-slash': todo.id === currentTodo },
                        { 'far fa-eye': todo.id !== currentTodo },
                      )}
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
