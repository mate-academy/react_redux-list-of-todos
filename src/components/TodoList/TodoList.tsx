/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, selectedTodo }) => {
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status) as Status;

  const queryFilter = (todo: Todo) => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  };

  const statusFilter = () => {
    switch (status) {
      case 'all':
        query
          ? setTodoList(todos.filter(todo => queryFilter(todo)))
          : setTodoList(todos);
        break;

      case 'active':
        query
          ? setTodoList(
              todos.filter(todo => !todo.completed && queryFilter(todo)),
            )
          : setTodoList(todos.filter(todo => !todo.completed));
        break;

      case 'completed':
        query
          ? setTodoList(
              todos.filter(todo => todo.completed && queryFilter(todo)),
            )
          : setTodoList(todos.filter(todo => todo.completed));
        break;

      default:
        setTodoList(todos);
    }
  };

  const setCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
  };

  useEffect(() => {
    statusFilter();
  }, [query, status]);

  return (
    <>
      {!todoList.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {todoList.length > 0 && (
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
            {todoList.map(todo => (
              <tr data-cy="todo" key={todo.id}>
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
                    className={classNames({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
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
                      {selectedTodo?.id === todo.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
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

