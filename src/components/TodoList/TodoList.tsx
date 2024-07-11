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
      {!filteredTodos.length ? (
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
            {filteredTodos.map(({ id, title, completed, userId }) => (
              <tr data-cy="todo" key={id}>
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn({
                      'has-text-danger': !completed,
                      'has-text-success': completed,
                    })}
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      setSelectedUserId(userId);
                      handleSelectTodo({ id, title, completed, userId });
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': id !== selectedTodo?.id,
                          'fa-eye-slash': id === selectedTodo?.id,
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
