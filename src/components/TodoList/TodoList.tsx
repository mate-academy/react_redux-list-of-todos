/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { getFilteredTodos } from '../../utils/getFiltredTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter);
  const queryFilter = useAppSelector(state => state.filter);

  const selectTodoHandler = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  const filteredTodos = getFilteredTodos(
    todos,
    queryFilter.query,
    status.status,
  );

  return (
    <>
      {!filteredTodos && <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>}


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
                  className={
                    !todo.completed ? 'has-text-danger' : 'has-text-success'
                  }
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button" onClick={() => selectTodoHandler(todo)}>
                  <span className="icon">
                    <i className={classNames('far', {
                        'fa-eye-slash': todo.id === currentTodo?.id,
                        'fa-eye': todo.id !== currentTodo?.id,
                      })} />
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

