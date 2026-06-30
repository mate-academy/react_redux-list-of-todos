import React from 'react';
import { Loader } from '../Loader';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { clearCurrentTodo, setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { useEffect } from 'react';
import { useState } from 'react';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentTodo && !currentTodo.user) {
      setIsLoading(true);
      getUser(currentTodo.userId).then(user => {
        dispatch(setCurrentTodo({ ...currentTodo, user }));
        setIsLoading(false);
      });
    }
  }, [currentTodo, dispatch]);
  if (!currentTodo) {
    return null;
  }
  
  return (
    <div className={`modal ${currentTodo ? 'is-active' : ''}`} data-cy="modal">
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
              {currentTodo ? `Todo #${currentTodo.id}` : ''}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearCurrentTodo())}
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
              <a href="mailto:Sincere@april.biz">{currentTodo?.user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
