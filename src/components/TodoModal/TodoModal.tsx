import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [user, setUser] = useState<User>();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    getUser(selectedTodo.userId).then(userFromServer => {
      setUser(userFromServer);
      setIsLoad(false);
    });
  }, [selectedTodo]);

  const handleClose = () => {
    dispatch(currentTodoSlice.actions.clearSelected());
  };

  if (!selectedTodo) {
    return;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoad ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                {selectedTodo.completed && (
                  <strong className="has-text-success">Done</strong>
                )}
                {!selectedTodo.completed && (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
