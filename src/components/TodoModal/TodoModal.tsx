import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { setCompletedClass } from '../TodoList';
import { clearCurrentTodo } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const [loadedUser, setLoadedUser] = useState<User | null>(null);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { todo: currentTodo, selectedTodoUser } = useAppSelector(
    state => state.currentTodo,
  );

  useEffect(() => {
    setIsModalLoading(true);
    if (!selectedTodoUser) {
      return;
    }

    getUser(selectedTodoUser)
      .then(setLoadedUser)
      .finally(() => setIsModalLoading(false));
  }, [selectedTodoUser]);

  const handleClose = () => {
    setIsModalLoading(false);
    setLoadedUser(null);
    dispatch(clearCurrentTodo());
  };

  const { id, title, completed } = currentTodo || {};
  const { name, email } = loadedUser || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoading ? (
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
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={setCompletedClass(completed)}>
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
