import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { currentTodoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const [choosedTodoUser, setChoosedTodoUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo) || null;

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then(user => {
        setChoosedTodoUser(user);
      });
    }
  }, [currentTodo]);

  const handleDeleteCurrentTodo = () => {
    dispatch(currentTodoActions.delete());
    setChoosedTodoUser(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!choosedTodoUser && <Loader />}

      {currentTodo && choosedTodoUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleDeleteCurrentTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${choosedTodoUser?.email}`}>
                {choosedTodoUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
