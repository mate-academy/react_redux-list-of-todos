/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../services/todos';
import { actions as actionsTodos } from '../../features/todos';
import cn from 'classnames';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { getPreparedTodos } from '../../utils/getPreparedTodos';

type Props = {
  setIsLoadindTodos: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadindTodos: boolean;
};

export const TodoList: React.FC<Props> = ({
  setIsLoadindTodos,
  isLoadindTodos,
}) => {
  const todos = useAppSelector(state => state.todos);
  const filterSettings = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const { query, status } = filterSettings;

  const visibleTodods = getPreparedTodos(query, status, todos);

  const handleOnClick = (todo: Todo) => {
    dispatch(actionsCurrentTodo.setTodo(todo));
  };

  const getDataTodos = async () => {
    try {
      setIsLoadindTodos(true);

      const todosFromServer = await getTodos();
      dispatch(actionsTodos.setTodos(todosFromServer));
    } catch (error) {
    } finally {
      setIsLoadindTodos(false);
    }
  };

  useEffect(() => {
    getDataTodos();
  }, []);

  return (
    <>
      {!isLoadindTodos && todos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!isLoadindTodos && (
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
            {visibleTodods.map(todo => (
              <tr
                data-cy="todo"
                className={cn({ 'has-background-info-light': currentTodo })}
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
                    className={cn(
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
                    onClick={() => handleOnClick(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          currentTodo?.id === todo.id
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
