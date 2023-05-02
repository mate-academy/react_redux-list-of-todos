import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos as Todo[]);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const onButtonClick = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  const { query, status } = useAppSelector(state => state.filter);

  const selectedList = () => {
    switch (status) {
      case 'active':
        return todos.filter(todo => todo.completed === false);
      case 'completed':
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const modifiedList = selectedList().filter(list => {
    return list.title.toUpperCase().includes(query.toUpperCase());
  });

  return (
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
        {modifiedList.map(todo => (
          <tr
            data-cy="todo"
            className=""
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
              <p className={classNames({
                'has-text-danger': !todo.completed,
              },
              {
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
                onClick={() => onButtonClick(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'far',
                      { 'fa-eye': todo.id !== selectedTodo?.id },
                      { 'fa-eye-slash': todo.id === selectedTodo?.id },
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
