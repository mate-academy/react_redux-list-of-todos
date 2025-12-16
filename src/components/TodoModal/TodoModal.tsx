import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector, useDispatchSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatchSelector();
  const setModalNull = () => dispatch(currentTodoSlice.actions.set(null));
  const todo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async (userId: number) => {
      setIsLoading(true);
      setUser(await getUser(userId));
      setIsLoading(false);
    };

    if (todo) {
      fetchUser(todo.userId);
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalNull()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              {user && <a href={'mailto:' + user.email}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
