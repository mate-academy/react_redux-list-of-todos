import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  useEffect(() => {
    (async () => {
      if (currentTodo) {
        const fetchedUser = await getUser(currentTodo?.userId);

        setCurrentUser(fetchedUser);
      }
    })();
  }, []);

  const handleModalClose = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {currentUser && currentTodo ? (
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
              onClick={() => handleModalClose()}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo.title}</p>

            <p className="block" data-cy="modal-user">
              {!currentTodo.completed
                ? <strong className="has-text-danger">Planned</strong>

                : <strong className="has-text-success">Done</strong>}
              {' by '}
              <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
            </p>
          </div>
        </div>
      )
        : <Loader />}
    </div>
  );
};
