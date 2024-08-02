/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { SelectedStatus } from '../../types/SelectedStatus';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const selectedTodoId = useAppSelector(state => state.currentTodo?.id);
  const selectedBy = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    filterTodos();
  }, [query, selectedBy, todos]);

  const filterTodos = () => {
    let result = todos;

    if (query !== '') {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (selectedBy) {
      case SelectedStatus.active:
        result = result.filter(todo => !todo.completed);
        break;
      case SelectedStatus.complited:
        result = result.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    setFilteredTodos(result);
  };

  if (filteredTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
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
          {filteredTodos.map(todo => {
            const { id, completed, title } = todo;

            return (
              <tr data-cy="todo" key={id}>
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={cn({
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
                    onClick={() =>
                      dispatch(currentTodoActions.setCurrentTodo(todo))
                    }
                  >
                    <i
                      className={cn('far', {
                        'fa-eye-slash': id === selectedTodoId,
                        'far fa-eye': id !== selectedTodoId,
                      })}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
