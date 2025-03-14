import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, setTodo } from '../../app/store';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(response => setUser(response))
        .finally(() => setLoading(false));
    }
  }, [currentTodo]);

  const handleModalClose = () => {
    dispatch(setTodo({} as Todo));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && user ? (
        <Loader />
      ) : (
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
              onClick={handleModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For completed */}
              {currentTodo.completed ? (
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
