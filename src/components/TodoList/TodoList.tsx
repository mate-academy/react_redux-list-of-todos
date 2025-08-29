import React from 'react';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import { todosFiltering } from '../../utils/todosFiltering';

type Props = {
  openTodoId: number | null;
  setOpenTodoId: (id: number | null) => void;
};

export const TodoList: React.FC<Props> = ({ openTodoId, setOpenTodoId }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const filter = useSelector((state: RootState) => state.filter);

  const filteredTodos = todosFiltering(todos, filter);

  const setSelectedTodo = (todo: Todo | null) => {
    dispatch(setCurrentTodo(todo));
  };

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
              <tr
                data-cy="todo"
                className={
                  openTodoId === todo.id ? 'has-background-info-light' : ''
                }
                key={todo.id}
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
                      setSelectedTodo(todo);
                      setOpenTodoId(todo.id);
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
