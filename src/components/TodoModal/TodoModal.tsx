import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import cn from 'classnames';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(currentTodoSlice.actions.deleteTodo(null));
  };

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setLoadingUser(true);

    const isData = async () => {
      try {
        const result = await getUser(currentTodo.userId);

        if (result) {
          setUser(result);
        }
      } finally {
        setLoadingUser(false);
      }
    };

    isData();
  }, [currentTodo]);

  if (loadingUser) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        <Loader />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{currentTodo?.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={closeModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            <strong
              className={cn(
                'has-text',
                currentTodo?.completed ? 'has-text-success' : 'has-text-danger',
              )}
            >
              {currentTodo?.completed ? 'Done' : 'Planned'}
            </strong>
            {' by '}
            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
