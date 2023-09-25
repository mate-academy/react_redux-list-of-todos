/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getTodo } from '../../redux/selectors';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions } from '../../redux/features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const userTodo = useAppSelector(getTodo);
  const dispatch = useAppDispatch();

  const removeTodo = () => {
    dispatch(actions.removeTodo());
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        if (userTodo) {
          const userFromServer = await getUser(userTodo.userId);

          setUser(userFromServer);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${userTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {`${userTodo?.title}`}
            </p>

            <p className="block" data-cy="modal-user">
              {userTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
