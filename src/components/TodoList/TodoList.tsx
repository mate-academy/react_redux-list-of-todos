/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filter.status === 'all' ||
      (filter.status === 'completed' && todo.completed) ||
      (filter.status === 'active' && !todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const noTodos = filteredTodos.length === 0;

  return (
    <>
      {noTodos && (
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
          {filteredTodos.map(todo => {
            const isSelected = currentTodo?.id === todo.id;

            return (
              <tr data-cy="todo" key={todo.id} className={cn({
                'has-background-info-light': isSelected,
              })}>

                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={cn({ 'has-text-success': todo.completed, 'has-text-danger': !todo.completed })}>
                    {todo.title}
                  </p>
                </td>

                <td className={"has-text-right is-vcentered"}>
                  <button data-cy="selectButton" className="button" type="button" onClick={() => { dispatch(setCurrentTodo(isSelected ? null : todo)) }}>
                    <span className="icon">
                      <i className={cn({ 'far fa-eye': !isSelected, 'fas fa-eye-slash': isSelected })} />
                    </span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table >
    </>
  );
};
