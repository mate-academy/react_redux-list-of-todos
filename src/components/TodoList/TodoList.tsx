/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions } from '../../features/currentTodo';

type Props = {
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ selectedTodo }) => {
  const dispatch = useDispatch();

  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos: Todo[] = useMemo(() => {
    let todoList = [...todos];

    if (query) {
      todoList = todoList.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (status) {
      case (Status.ACTIVE):
        return todoList.filter(todo => !todo.completed);

      case (Status.COMPLETED):
        return todoList.filter(todo => todo.completed);

      case (Status.All):
      default:
        return todoList;
    }
  }, [todos, status, query]);

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
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map(todo => {
              const { id, completed, title } = todo;

              return (
                <tr data-cy="todo" className="" key={id}>
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className={classNames({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    })}
                    >
                      {title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(actions.setTodo(todo))}
                    >
                      <span className="icon">
                        <i className={classNames({
                          'far fa-eye': !selectedTodo,
                          'far fa-eye-slash': selectedTodo,
                        })}
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
