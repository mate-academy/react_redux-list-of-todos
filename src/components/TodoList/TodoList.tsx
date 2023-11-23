/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todos: Todo[] | null,
  loading: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos,
  loading,
}) => {
  const dispatch = useDispatch();
  const selected = useAppSelector(state => state.currentTodo);

  const onSelectedTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {!todos?.length && !loading ? (
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
            {todos?.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={cn({ 'has-background-info-light': selected })}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    {todo.completed && (
                      <i className="fas fa-check" />
                    )}
                  </span>
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => onSelectedTodo(todo)}
                  >
                    <span className="icon">
                      <i className={cn('far', {
                        'fa-eye-slash': selected?.id === todo.id,
                        'far fa-eye': selected !== todo,
                      })}
                      />
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
