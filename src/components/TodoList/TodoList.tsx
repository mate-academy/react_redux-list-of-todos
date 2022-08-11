import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { action as SelectedAction } from '../../store/selectedTodo';
import { Sort } from '../../types/Sort';

type Props = {
  userId: (value: React.SetStateAction<number>) => void

};

export const TodoList: React.FC<Props> = ({
  userId,
}) => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.selectedTodo?.id);
  const todos = useAppSelector(state => {
    const filters = state.filter;

    return state.todos.filter(todo => {
      const includes = todo.title.toLowerCase()
        .includes(filters.query.toLowerCase());

      switch (filters.selection) {
        case Sort.completed:
          return todo.completed && includes;
        case Sort.active:
          return !todo.completed && includes;
        default:
          return includes;
      }
    });
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
        {todos.map(todo => (
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
              <p className={classNames(
                todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger',
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
                onClick={() => {
                  dispatch(SelectedAction.select(todo));
                  userId(todo.userId);
                }}
              >
                <span className="icon">

                  <i className={classNames('far', {
                    'fa-eye-slash': selectedTodo === todo.id,
                    'fa-eye': !(selectedTodo === todo.id),
                  })}
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
