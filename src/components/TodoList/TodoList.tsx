/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter)
  const dispatch = useAppDispatch();
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const setCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
  };

  useEffect(() => {
    setFilteredTodos(getFilteredTodos(todos, filter))
  }, [filter]);

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
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.map((todo: Todo) => (
            <tr data-cy="todo">
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
                <button data-cy="selectButton" className="button" type="button">
                  <span
                    className="icon"
                    onClick={() => {
                      setCurrentTodo(todo)
                    }}
                  >
                    <i className={cn('far', {
                      "fa-eye": todo.id !== currentTodo?.id,
                      'fa-eye-slash': todo.id === currentTodo?.id,
                    })} />
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
