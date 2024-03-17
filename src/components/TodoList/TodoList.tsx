/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { v4 as getId } from 'uuid'
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const filter = {
    query,
    status,
  };

  const filteredTodos = getFilteredTodos(filter, todos);

  const { id } = currentTodo || {} as Todo;

  const setCurrentTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <>
      {!filteredTodos.length
        ? (
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
                  key={getId()}
                  data-cy="todo"
                  className={cn({
                    'has-background-info-light': todo.id === id,
                  })}
                >
                  <td className="is-vcentered">{todo.id}</td>

                  {
                    todo.completed
                      ? (
                        <td className="is-vcentered">
                          <span className="icon" data-cy="iconCompleted">
                            <i className="fas fa-check" />
                          </span>
                        </td>
                      ) : (
                        <td className="is-vcentered"></td>
                      )
                  }

                  <td className="is-vcentered is-expanded">
                    <p
                      className={cn({
                        'has-text-danger': !todo.completed,
                        'has-text-success': todo.completed
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
                      onClick={() => setCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn(
                            "far",
                            {
                              "fa-eye": todo.id !== id,
                              "fa-eye-slash": todo.id === id,
                            }
                          )}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </>
  );
};
