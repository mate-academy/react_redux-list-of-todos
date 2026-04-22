/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import { setUser } from '../../features/user';
import { getUser } from '../../api';

export const TodoList = () => {
  const dispatch = useDispatch()
  const todos = useAppSelector(state => state.todos)
  const filters = useAppSelector(state => state.filter)

  const filteredTodos = () => {
    let copyTodos = [...todos];

    switch (filters.status) {
      case 'active':
        copyTodos = copyTodos.filter(item => !item.completed);
        break;
      case 'completed':
        copyTodos = copyTodos.filter(item => item.completed);
        break;
      default:
        break;
    }

    copyTodos = copyTodos.filter(item => item.title.toLowerCase().includes(filters.query));

    return copyTodos;
  };

  const openTodo = async (selectedTodo: Todo) => {
    try {
      dispatch(setCurrentTodo(selectedTodo))
      dispatch(setUser(await getUser(selectedTodo.userId)))
    } finally {
    }
  };

  return (
    <>
      {filteredTodos().length === 0
        ? <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
        :

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
          {filteredTodos().map(todo => {
            return (
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                {todo.completed ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered" />
                )}
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames(
                      `has-text-${todo?.completed ? 'success' : 'danger'}`,
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
                    onClick={() => openTodo(todo)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      }
    </>
  );
};
