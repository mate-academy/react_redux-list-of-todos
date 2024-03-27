import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUsers } from '../../services/users';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleCloseModal = () => {
    dispatch(actionsCurrentTodo.removeTodo());
  };

  const getDataUser = async () => {
    try {
      setIsLoadingUser(true);

      if (currentTodo) {
        const userFromServer = await getUsers(currentTodo?.userId);

        setUser(userFromServer);
      }
    } catch (error) {
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    getDataUser();
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #3
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleCloseModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {currentTodo?.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            <a href="mailto:Sincere@april.biz">{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
