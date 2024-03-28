import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';

type Props = {
  setIsLoadingUser: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingUser: boolean;
};

export const TodoModal: React.FC<Props> = ({
  setIsLoadingUser,
  isLoadingUser,
}) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleCloseModal = () => {
    dispatch(actionsCurrentTodo.removeTodo());
  };

  const getDataUser = useCallback(async () => {
    try {
      setIsLoadingUser(true);

      if (currentTodo) {
        const userFromServer = await getUser(currentTodo?.userId);

        setUser(userFromServer);
      }
    } catch (error) {
    } finally {
      setIsLoadingUser(false);
    }
  }, [currentTodo]);

  useEffect(() => {
    getDataUser();
  }, [currentTodo, getDataUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser && <Loader />}

      {!isLoadingUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
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
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
