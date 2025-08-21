/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { currentUserSlice } from '../../features/currentUser';

type TodoListProps = {
  setOpenInfo: (val: boolean) => void;
};

export const TodoList: React.FC<TodoListProps> = ({ setOpenInfo }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filterType = useAppSelector(state => state.filter.status);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();

    switch (filterType) {
      case 'all':
        setVisibleTodos(
          todos.filter(todo =>
            todo.title.toLowerCase().includes(normalizedQuery),
          ),
        );
        break;
      case 'active':
        setVisibleTodos(
          todos.filter(
            todo =>
              todo.title.toLowerCase().includes(normalizedQuery) &&
              todo.completed !== true,
          ),
        );
        break;
      case 'completed':
        setVisibleTodos(
          todos.filter(
            todo =>
              todo.title.toLowerCase().includes(normalizedQuery) &&
              todo.completed !== false,
          ),
        );
        break;
    }
  }, [todos, query, filterType]);

  const openInfo = async (todo: Todo) => {
    try {
      setOpenInfo(true);
      const currentUser = await getUser(todo.userId);

      dispatch(currentUserSlice.actions.showActiveUser(currentUser));
      dispatch(currentTodoSlice.actions.showModal(todo));
    } catch {
      throw new Error();
    }
  };

  return (
    <>
      {visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {visibleTodos.map(todo => (
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
                  onClick={() => {
                    openInfo(todo);
                  }}
                >
                  <span className="icon">
                    <i className={`far fa-eye${currentTodo?.id === todo.id ? '-slash' : ''}`} />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
