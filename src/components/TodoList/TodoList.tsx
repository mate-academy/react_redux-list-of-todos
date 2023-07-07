/* eslint-disable no-console */
/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { AppDispatch, RootState } from '../../app/store';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { PayloadType } from '../../features/filter';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch<AppDispatch>();
  let filter: PayloadType = useSelector<RootState, PayloadType>((state) => state.filter);
  const selectedTodo: Todo | null = useSelector<RootState, Todo | null>(
    (state) => state.currentTodo,
  );

  const onOpen = (id: number) => {
    const foundTodo = todos.find(todo => id === todo.id);

    if (foundTodo) {
      dispatch(currentTodoActions.setTodo(foundTodo));
    }
  };

  const filterCase = () => {
    let filteredTodos = todos;

    if (!filter) {
      filter = {
        select: 'all',
        query: '',
      };
    }

    if (filter.select === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (filter.select === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (filter.query) {
      filteredTodos = filteredTodos
        .filter(todo => todo.title
          .toLowerCase()
          .includes(filter.query.toLowerCase().trim()));
    }

    return filteredTodos;
  };

  const visibleTodos = filterCase();

  return (
    <>
      {!visibleTodos && (
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
          {visibleTodos.map(({
            id,
            completed,
            title,
          }) => (
            <tr key={id} data-cy="todo">
              <td className="is-vcentered">{id}</td>
              {
                !completed
                  ? <td className="is-vcentered" />
                  : (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  )
              }

              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
                    'has-text-danger': !completed,
                    'has-text-success': completed,
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
                  onClick={() => {
                    onOpen(id);
                  }}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye-slash': selectedTodo?.id === id,
                      'fa-eye': selectedTodo?.id !== id,
                    })}
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
