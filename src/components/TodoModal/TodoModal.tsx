import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';

import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoader, setIsLoader] = useState(false);

  const getUserFromServer = async () => {
    setIsLoader(true);
    try {
      if (selectedTodo) {
        const userFromServer = await getUser(selectedTodo.userId);

        setUser(userFromServer);
      }
    } catch {
      throw new Error('something went wrong');
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actions.removeTodo())}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{selectedTodo?.title}</p>
            <p className="block" data-cy="modal-user">
              {!selectedTodo?.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
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
