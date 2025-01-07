/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setLoading, setTodos } from '../../features/todos';
import { getTodos } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import cn from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const { currentTodo } = useAppSelector(
    state => state.currentTodo,
  );

  const filteredTodos = todos.filter((todo: Todo)=> {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    if (status === 'all') {
      return matchesQuery;
    }

    const matchesStatus =
      status ==='completed' ? todo.completed : !todo.completed;

    return matchesQuery && matchesStatus;
  });

  const handleOpenModal = (todo: Todo) => {
    setCurrentTodo(todo);
  };


  useEffect(() => {
    dispatch(setLoading(true));
    getTodos()
      .then(todosFromServer => dispatch(setTodos(todosFromServer)))
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (filteredTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    )
  }

  return (
    <>
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
          {filteredTodos.map((todo: Todo) => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': currentTodo?.id === todo.id,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : (
                  ' '
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={todo.completed ? 'has-text-success' : "has-text-danger"}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleOpenModal(todo)}
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
    </>
  );
};
