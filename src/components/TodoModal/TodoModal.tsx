import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  if (selectedTodo) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      getUser(selectedTodo.userId).then(setUser);
    }, [selectedTodo.userId]);
  }

  const close = () => {
    dispatch(currentTodoSlice.actions.closeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{`${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={close}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
