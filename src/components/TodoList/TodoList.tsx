/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { todosFiltering } from './Filtering';

type Props = {
  openTodoId: number | null;
  setOpenTodoId: (id: number | null) => void;
};

export const TodoList: React.FC<Props> = ({ openTodoId, setOpenTodoId }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos);
  const filter = useAppSelector((state: RootState) => state.filter);
  const filteredTodo = todosFiltering(todos, filter);

  const setSelectedTodo = (todo: Todo | null) => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <>
      {filteredTodo.length === 0 ? (
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
            {filteredTodo.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={todo.completed ? 'has-background-info-light' : ''}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  ) : null}
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
                    onClick={() => {
                      if (openTodoId === todo.id) {
                        setSelectedTodo(null);
                        setOpenTodoId(null);
                      } else {
                        setSelectedTodo(todo);
                        setOpenTodoId(todo.id);
                      }
                    }}
                  >
                    <span className="icon">
                      <i
                        className={
                          openTodoId === todo.id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
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
