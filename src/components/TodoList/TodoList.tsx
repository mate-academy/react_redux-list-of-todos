/* eslint-disable */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { Status } from '../../types/Status';

type Props = {
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const TodoList: React.FC<Props> = ({ setSelectedUserId }) => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const todosFromServer = useAppSelector(state => state.todos);

  const filterTodos = useMemo(() => {
    return (currentTodos: Todo[]) => {
      return currentTodos
        .filter(todo => {
          switch (status) {
            case Status.all:
              return currentTodos;

            case Status.active:
              return !todo.completed;

            case Status.completed:
              return todo.completed;

            default:
              return;
          }
        })
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    };
  }, [query, status]);

  const filteredTodos = useMemo(
    () => filterTodos(todosFromServer),
    [filterTodos, todosFromServer],
  );

  const handleSelectTodo = (newTodo: Todo | null) =>
    dispatch(currentTodoSlice.actions.setCurrentTodo(newTodo));

  return (
    <>
      {filteredTodos.length === 0 ? (
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
                  <p
                    className={cn({
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
                    onClick={() => {
                      setSelectedUserId(todo.userId);
                      handleSelectTodo(todo);
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': todo.id !== selectedTodo?.id,
                          'fa-eye-slash': todo.id === selectedTodo?.id,
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
