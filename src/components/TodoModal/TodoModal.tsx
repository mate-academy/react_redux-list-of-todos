import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';
// import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleRemoveCurrent = () => {
    dispatch(actions.removeTodo());
  };

  const fetchUser = async (id: number) => {
    try {
      const userFromServer = await getUser(id);

      setCurrentUser(userFromServer);
    } catch {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    if (currentTodo) {
      fetchUser(currentTodo.userId);
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {/* <Loader /> */}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #
            {currentTodo?.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => handleRemoveCurrent()}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

          <p className="block" data-cy="modal-user">
            {currentTodo?.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
