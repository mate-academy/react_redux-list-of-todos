/* eslint-disable max-len */
import {
  FC, useMemo,
} from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { filterTodos } from '../../helpers/filterFunctionForTodos';

export const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const { query, status } = useAppSelector(state => state.filter);

  const handleTodoSelection = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const visibleTodos = useMemo(
    () => filterTodos(todos, query, status),
    [todos, query, status],
  );

  return (
    <>
      {
        todos.length === 0 && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
      }

      {
        todos.length !== 0 && (
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
              {
                visibleTodos.map((todo) => (
                  <tr
                    key={todo.id}
                    data-cy="todo"
                    className=""
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
                        )
                        : (<td className="is-vcentered" />)
                    }

                    <td className="is-vcentered is-expanded">
                      <p
                        className={`has-text-${todo.completed ? 'success' : 'danger'}`}
                      >
                        {todo.title}
                      </p>
                    </td>
                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => handleTodoSelection(todo)}
                      >
                        <span className="icon">
                          <i
                            className={cn({
                              far: true,
                              'fa-eye': selectedTodo?.id !== todo.id,
                              'fa-eye-slash': selectedTodo?.id === todo.id,
                            })}
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </>
  );
};
