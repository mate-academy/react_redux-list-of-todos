import React from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currTodoActions } from '../../features/currentTodo';
import { actions as currUserActions } from '../../features/currentUser';
import { actions as loadingActions } from '../../features/loading';

import * as todosServices from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const Todos: React.FC<Props> = ({ todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  const getUser = (userId: number, todo: Todo) => {
    dispatch(loadingActions.setModalAction(true));

    todosServices.getUser(userId).then(user => {
      dispatch(currTodoActions.setTodo(todo));
      dispatch(currUserActions.setUser(user));
      setTimeout(() => {
        dispatch(loadingActions.setModalAction(false));
      }, 500);
    });
  };

  return (
    <>
      {todos.map(todo => {
        const { id, title, completed, userId } = todo;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-success-light': currentTodo?.id === id,
            })}
            key={id}
          >
            {' '}
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              <span className="icon" data-cy={completed ? 'iconCompleted' : ''}>
                <i
                  className={cn('fas', {
                    'fa-check': completed,
                  })}
                />
              </span>
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn('has-text-success', {
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
                onClick={() => getUser(userId, todo)}
              >
                <span className="icon">
                  <i
                    className={cn('fa', {
                      'fa-eye-slash': currentTodo?.id === id,
                      'fa-eye': currentTodo?.id !== id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
