import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const resetCurrentTodo = () => {
    dispatch(actions.removeTodo());
  };

  const getUserFromServer = async (id: number) => {
    setIsLoading(true);

    try {
      const userFromServer = await getUser(id);

      setUser(userFromServer);
    } catch (err) {
      throw new Error('User not found');
    } finally {
      setIsLoading(false);
    }
  };

  const { id, title, completed, userId } = currentTodo || ({} as Todo);

  useEffect(() => {
    if (userId) {
      getUserFromServer(userId);
    }
  }, [userId]);

  return (
    <div
      className={cn(
        'modal',

        {
          'is-active': currentTodo,
        },
      )}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={resetCurrentTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
