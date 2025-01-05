import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectTodo = useAppSelector((state: RootState) => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectTodo) {
      return;
    }

    const userData = async () => {
      setIsLoading(true);
      try {
        const usersData = await getUser(selectTodo.userId);

        setUser(usersData);
      } finally {
        setIsLoading(false);
      }
    };

    userData();
  }, [selectTodo]);

  const onClose = () => {
    dispatch(setCurrentTodo(null));
  };

  if (!selectTodo) {
    return null;
  }

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
              Todo #{selectTodo.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {selectTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}{' '}
              by <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
