import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoadint, setIsLoading] = useState(true);
  const [todoUser, setTodoUser] = useState<User | null>(null);
  const userId = currentTodo ? currentTodo.userId : undefined;

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      getUser(userId)
        .then(setTodoUser)
        .catch(err =>
          // eslint-disable-next-line no-console
          console.error(err),
        )
        .finally(() => setIsLoading(false));
    } else {
      setTodoUser(null);
      setIsLoading(false);
    }
  }, [userId]);

  const dispatch = useAppDispatch();

  return (
    <>
      {currentTodo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {isLoadint ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{currentTodo.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => dispatch(currentTodoSlice.actions.clear())}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {currentTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {currentTodo.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}
                  {' by '}
                  {todoUser?.email && todoUser?.name ? (
                    <a href={'mailto:' + todoUser.email}>{todoUser.name}</a>
                  ) : (
                    'Unknown User'
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
