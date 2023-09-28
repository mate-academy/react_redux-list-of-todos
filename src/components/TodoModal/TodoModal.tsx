import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const removeSelectedTodo = () => dispatch(currentTodoActions.removeTodo());

  const hasSelectedTodo = selectedTodo !== null;
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (selectedTodo !== null) {
      getUser(selectedTodo.userId)
        .then(setUser)
        .catch(() => { });
    }
  }, []);

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
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => removeSelectedTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {hasSelectedTodo && (
                selectedTodo.title
              )}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {!selectedTodo?.completed && (
                <strong className="has-text-danger">Planned</strong>

              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
