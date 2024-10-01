import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const selectedTodo = useAppSelector(state => state.currentTodo) as Todo;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { id, title, completed } = selectedTodo as Todo;

  useEffect(() => {
    setIsLoading(true);

    getUser(selectedTodo.userId)
      .then(currentUser => setUser(currentUser))
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedTodo]);

  const handleClose = () => {
    dispatch(currentTodoSlice.actions.removeSelectedTodo());
  };

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {!completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
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
