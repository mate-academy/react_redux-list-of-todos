import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { actions } from '../../features/currentTodo';
import { UserPart } from './UserPart';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const selectedTodo = useAppSelector((state: RootState) => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedTodo) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    getUser(selectedTodo.userId).finally(() => {
      setIsLoading(false);
    });
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && selectedTodo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>
            <UserPart selectedTodo={selectedTodo} />
          </div>
        </div>
      )}
    </div>
  );
};
