import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const selectTodo = useAppSelector((state: RootState) => state.currentTodo);
  const handleTodoSelect = (todo: Todo) => {
    if (selectTodo && selectTodo.id === todo.id) {
      dispatch(setCurrentTodo(null));
    } else {
      dispatch(setCurrentTodo(todo));
    }
  };

  return (
    <>
      {todos.length === 0 ? (
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
              <th />
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => {
              const isSelected = selectTodo && selectTodo.id === todo.id;

              return (
                <tr
                  data-cy="todo"
                  className={isSelected ? 'has-background-info-light' : ''}
                  key={todo.id}
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
                      onClick={() => handleTodoSelect(todo)}
                    >
                      <span className="icon">
                        <i
                          className={`far ${
                            isSelected ? 'fa-eye-slash' : 'fa-eye'
                          }`}
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
