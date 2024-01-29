import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { todoActions } from '../../features/currentTodo';
import { modalActions } from '../../features/modalReducer';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const closeModal = () => {
    dispatch(todoActions.removeTodo());
    dispatch(modalActions.close());
  };

  useEffect(() => {
    if (todo?.userId) {
      getUser(todo.userId)
        .then(data => setUsername(data.name))
        .finally(() => setIsLoading(false));
    }
  }, [todo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? <Loader /> : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
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
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href="mailto:Sincere@april.biz">{username}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
